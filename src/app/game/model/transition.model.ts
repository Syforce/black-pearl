import { AnimatedElement } from '../base/animated-element.abstract';

import { TransitionType } from './enum/transition-type.enum';
import { AnimationState } from './enum/animation-state.enum';

export class Transition {
	private element: AnimatedElement;
	private actions: Array<TransitionStage> = new Array<TransitionStage>();
	private ready: boolean = false;
	private currentTransitionIndex: number = -1;

	public setElement(element: AnimatedElement): Transition {
		this.element = element;

		return this;
	}

	public moveTo(x: number, y: number, time: number, delay: number = 0): Transition {
		this.actions.push({
			type: TransitionType.MOVE_TO,
			time: time,
			delay: delay,
			value: {
				x, y
			}
		});

		return this;
	}

	public setState(state: AnimationState, speed: number = 1, time: number = 1, delay: number = 0): Transition {
		this.actions.push({
			type: TransitionType.PLAY_STATE,
			time: time,
			delay: delay,
			value: {
				state: state,
				speed: speed
			}
		});

		return this;
	}

	public play() {
		for (let i = 0; i < this.actions.length; i++) {
			const currentTransitionStage: TransitionStage = this.actions[i];

			switch (currentTransitionStage.type) {
				case TransitionType.MOVE_TO: {
					currentTransitionStage.value.delayCounter = currentTransitionStage.delay / 25;
					currentTransitionStage.value.counter = currentTransitionStage.time / 25;
					currentTransitionStage.value.index = 0;
					break;
				}
				case TransitionType.PLAY_STATE: {
					currentTransitionStage.value.delayCounter = currentTransitionStage.delay / 25;
					currentTransitionStage.value.counter = currentTransitionStage.time / 25;
					currentTransitionStage.value.index = 0;
					break;
				}
			}
		}

		this.ready = true;
	}

	private initAnimation(currentTransitionStage: TransitionStage) {
		switch (currentTransitionStage.type) {
			case TransitionType.MOVE_TO: {
				// currentTransitionStage.value.delayCounter = currentTransitionStage.delay / 25;
				// currentTransitionStage.value.counter = currentTransitionStage.time / 25;
				// currentTransitionStage.value.index = 0;

				// console.log(currentTransitionStage.value.counter, currentTransitionStage.value.x, this.element.x);

				currentTransitionStage.value.distanceX = (currentTransitionStage.value.x - this.element.x) / currentTransitionStage.value.counter;
				currentTransitionStage.value.distanceY = (currentTransitionStage.value.y - this.element.y) / currentTransitionStage.value.counter;
				currentTransitionStage.value.currentX = this.element.x;
				currentTransitionStage.value.currentY = this.element.y;

				// console.log(currentTransitionStage.value.distanceX, currentTransitionStage.value.distanceY);
				break;
			}
			case TransitionType.PLAY_STATE: {
				// currentTransitionStage.value.delayCounter = currentTransitionStage.delay / 25;
				// currentTransitionStage.value.counter = currentTransitionStage.time / 25;
				// currentTransitionStage.value.index = 0;
				break;
			}
		}
	}

	public nextTick() {
		if (!this.ready) {
			return;
		}

		try {
			this.currentTransitionIndex++;
			this.ready = this.actions.length > 0;

			for (let i = 0; i < this.actions.length; i++) {
				const currentTransitionStage: TransitionStage = this.actions[i];
				currentTransitionStage.value.index++;

				if (currentTransitionStage.value.index < currentTransitionStage.value.delayCounter) {
					continue;
				} else if (currentTransitionStage.value.index == currentTransitionStage.value.delayCounter ||
					(currentTransitionStage.value.delayCounter == 0 && currentTransitionStage.value.index == 1)) {
						this.initAnimation(currentTransitionStage);
				}

				switch (currentTransitionStage.type) {
					case TransitionType.MOVE_TO: {
						currentTransitionStage.value.currentX += currentTransitionStage.value.distanceX;
						currentTransitionStage.value.currentY += currentTransitionStage.value.distanceY;

						this.element.move(currentTransitionStage.value.currentX, currentTransitionStage.value.currentY);

						if (currentTransitionStage.value.index == currentTransitionStage.value.counter + currentTransitionStage.value.delayCounter) {
							this.actions.splice(i, 1);
							i--;
						}
						break;
					}
					case TransitionType.PLAY_STATE: {
						if (this.currentTransitionIndex % currentTransitionStage.value.speed == 0) {
							this.element.nextStateFrame(currentTransitionStage.value.state);
						}

						if (currentTransitionStage.value.index >= currentTransitionStage.value.counter + currentTransitionStage.value.delayCounter) {
							this.actions.splice(i, 1);
							i--;
						}
						break;
					}
				}
			}


			// if (this.currentTransitionStage) {
			// 	if (++this.currentTransitionStage.value.index == this.currentTransitionStage.value.counter + 1) {
			// 		this.setNextTransition();
			// 	}

			// 	switch (this.currentTransitionStage.type) {
			// 		case TransitionType.MOVE_TO: {
			// 			this.currentTransitionStage.value.currentX += this.currentTransitionStage.value.distanceX;
			// 			this.currentTransitionStage.value.currentY += this.currentTransitionStage.value.distanceY;

			// 			this.element.move(this.currentTransitionStage.value.currentX, this.currentTransitionStage.value.currentY);
			// 			break;
			// 		}
			// 	}
			// } else {
			// 	if (this.actions.length) {
			// 		this.setNextTransition();
			// 	}
			// }
		} catch (e) {
			console.log('Timer error, missmatch', e);
		}
	}

	// private setNextTransition() {
	// 	if (++this.currentTransitionIndex < this.actions.length) {
	// 		this.currentTransitionStage = this.actions[this.currentTransitionIndex];

	// 		switch (this.currentTransitionStage.type) {
	// 			case TransitionType.MOVE_TO: {
	// 				this.currentTransitionStage.value.counter = this.currentTransitionStage.time / 25;
	// 				this.currentTransitionStage.value.index = 0;

	// 				this.currentTransitionStage.value.distanceX = (this.currentTransitionStage.value.x - this.element.x) / this.currentTransitionStage.value.counter;
	// 				this.currentTransitionStage.value.distanceY = (this.currentTransitionStage.value.y - this.element.y) / this.currentTransitionStage.value.counter;
	// 				this.currentTransitionStage.value.currentX = this.element.x;
	// 				this.currentTransitionStage.value.currentY = this.element.y;
	// 				break;
	// 			}
	// 		}
	// 	} else {
	// 		this.currentTransitionStage = null;
	// 		// console.log('Transition finished');
	// 	}
	// }
}

interface TransitionStage {
	type: TransitionType;
	time: number;
	delay?: number;
	value?: any;
}