import { ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';

import { Animation } from '../model/animation.model';
import { Character } from '../model/character.model';

import { AnimationState } from '../model/enum/animation-state.enum';

export abstract class AnimatedElement implements AfterViewInit {
	protected ref: ElementRef;

	@ViewChild('reference', { static: true })
	public reference: ElementRef;

	@Input()
	public x: number;
	@Input()
	public y: number;
	@Input('config')
	public character: Character;

	protected currentState: AnimationState;
	protected currentAnimation: Animation;
	protected directionValue: number = 1;
	protected currentPosition: number = -1;

	constructor(ref: ElementRef) {
		this.ref = ref;
	}

	ngAfterViewInit() {
		this.init();
		this.updateCurrentPosition();
	}

	private init() {
		const style = this.reference.nativeElement.style;

		style['background'] = `url('/assets/sprites/${this.character.spriteName}.png') no-repeat`;
	}

	public move(x: number, y: number) {
		this.x = x;
		this.y = y;

		this.updateCurrentPosition();
	}

	public setState(state: AnimationState): Animation {
		this.currentState = state;
		this.updateStateAnimation();

		this.currentPosition = -1;

		return this.currentAnimation;
	}

	public nextTick() {
		const style = this.reference.nativeElement.style;
		this.currentPosition = this.currentPosition >= this.currentAnimation.frames.length - 1 ? 0 : ++this.currentPosition;

		style['background-position-x'] = `${this.currentAnimation.frames[this.currentPosition].x}px`;
		style['background-position-y'] = `${this.currentAnimation.frames[this.currentPosition].y}px`;
		style['width'] = `${this.currentAnimation.frames[this.currentPosition].width}px`;
		style['height'] = `${this.currentAnimation.frames[this.currentPosition].height}px`;
	}

	public nextStateFrame(state: AnimationState) {
		const style = this.reference.nativeElement.style;

		this.currentState = state;
		this.updateStateAnimation();

		if (this.currentPosition <= 0 && this.directionValue == -1) {
			this.currentPosition = this.currentAnimation.frames.length - 1;
		} else if (this.currentPosition >= this.currentAnimation.frames.length - 1 && this.directionValue == 1) {
			this.currentPosition = 0;
		} else {
			this.currentPosition += this.directionValue;
		}

		style['background-position-x'] = `${this.currentAnimation.frames[this.currentPosition].x}px`;
		style['background-position-y'] = `${this.currentAnimation.frames[this.currentPosition].y}px`;
		style['width'] = `${this.currentAnimation.frames[this.currentPosition].width}px`;
		style['height'] = `${this.currentAnimation.frames[this.currentPosition].height}px`;
	}


	/**
	 * Update the left and bottom css attributes based on this.x and this.y
	 */
	protected updateCurrentPosition() {
		const style = this.ref.nativeElement.style;

		style['left'] = `${this.x}px`;
		style['bottom'] = `${this.y}px`;
	}

	protected updateStateAnimation() {
		switch (this.currentState) {
			case AnimationState.IDLE: {
				this.currentAnimation = this.character.idleState;
				this.directionValue = 1;
				break;
			}
		}
	}
}