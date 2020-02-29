import { AnimatedElement } from '../base/animated-element.abstract';

import { Animation } from './animation.model';

import { TweenType } from './enum/tween-type.enum';
import { AnimationState } from './enum/animation-state.enum';

export class Tween {
	private element: AnimatedElement;
	private actions: Array<TweenElement> = new Array<TweenElement>();
	private currentTransitionIndex: number = -1;

	constructor(element: AnimatedElement) {
		this.element = element;
	}

	public moveTo(x: number, y: number, time: number, delay: number = 0): Tween {
		const tweenElement = new MoveTweenElement(this.element, {
			x, y, time, delay
		}, this.removeTween.bind(this));

		this.actions.push(tweenElement);

		return this;
	}

	public setState(state: AnimationState, frameSkip: number = 1, time: number = 0, cycles: number = 0, delay: number = 0) {
		const tweenElement = new StateTweenElement(this.element, {
			state, frameSkip, cycles, time, delay
		}, this.removeTween.bind(this));

		this.actions.push(tweenElement);

		return this;
	}

	public nextTick() {
		if (this.actions.length) {
			try {
				this.currentTransitionIndex++;

				for (let i = 0; i < this.actions.length; i++) {
					const tweenElement: TweenElement = this.actions[i];

					tweenElement.nextTick();
				}
			} catch (e) {
				console.log('Tween Tick error', e);
			}
		}
	}

	private removeTween(tween: TweenElement) {
		for (let i = 0; i < this.actions.length; i++) {
			if (this.actions[i].uuid == tween.uuid) {
				this.actions.splice(i, 1);
				return;
			}
		}
	}
}

abstract class TweenElement {
	protected type: TweenType;
	protected element: AnimatedElement;
	protected time: number = 0;
	protected counter: number;
	protected currentTime: number = -1;
	protected delay: number = 0;
	protected delayCounter: number = 0;
	protected removeTween: Function;

	public uuid: number = Math.ceil(Math.random() * 10000);


	constructor(type: TweenType, element: AnimatedElement, removeTween: Function, delay: number = 0) {
		this.type = type;
		this.element = element;
		this.removeTween = removeTween;
		this.delay = delay;

		this.initDelay();
	}

	public nextTick() {
		if (++this.currentTime == this.delayCounter) {
			this.init();
		} else if (this.counter > 0 && this.currentTime >= this.counter + this.delayCounter) {
			this.removeTween(this);
			return;
		} else if (this.currentTime < this.delayCounter) {
			return;
		}

		this.animate();
	}

	private initDelay() {
		this.delayCounter = this.delay / 25;
	}

	protected abstract init();

	protected abstract animate();
}

interface MoveTweenConfig {
	x: number;
	y: number;
	time: number;
	delay: number;
}

class MoveTweenElement extends TweenElement {
	private destinationX: number;
	private destinationY: number;
	private distanceX: number;
	private distanceY: number;
	private currentX: number;
	private currentY: number;

	constructor(element: AnimatedElement, config: MoveTweenConfig, removeTween: Function) {
		super(TweenType.MOVE, element, removeTween, config.delay);

		this.destinationX = config.x;
		this.destinationY = config.y;
		this.time = config.time;
	}

	protected init() {
		this.counter = this.time / 25;

		this.distanceX = (this.destinationX - this.element.x) / this.counter;
		this.distanceY = (this.destinationY - this.element.y) / this.counter;
		this.currentX = this.element.x;
		this.currentY = this.element.y;
	}

	protected animate() {
		this.currentX += this.distanceX;
		this.currentY += this.distanceY;

		this.element.move(this.currentX, this.currentY);
	}
}

interface StateTweenConfig {
	state: AnimationState;
	cycles: number;
	frameSkip: number;
	time: number;
	delay: number;
}

class StateTweenElement extends TweenElement {
	private state: AnimationState;
	private cycles: number = 0;
	private animation: Animation;
	private frameSkip: number = 1;

	constructor(element: AnimatedElement, config: StateTweenConfig, removeTween: Function) {
		super(TweenType.STATE, element, removeTween, config.delay);

		this.state = config.state;
		this.frameSkip = config.frameSkip;
		this.time = config.time;

		if (config.cycles) {
			this.cycles = config.cycles;
		}
	}

	protected init() {
		const counter: number = Math.floor(this.time / 25);
		this.counter = counter == 0 ? 0 : counter;
		this.animation = this.element.setState(this.state);
	}

	protected animate() {
		if (this.cycles) {
			if (this.currentTime < this.cycles * this.animation.frames.length + this.delayCounter) {
				this.animateNextTick();
			} else {
				this.removeTween(this);
			}
		} else {
			this.animateNextTick();
		}
	}

	private animateNextTick() {
		if (this.currentTime % this.frameSkip == 0) {
			this.element.nextTick();
		}
	}
}