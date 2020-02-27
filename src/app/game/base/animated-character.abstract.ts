import { AnimatedElement } from './animated-element.abstract';

import { AnimationState } from '../model/enum/animation-state.enum';

export abstract class AnimatedCharacter extends AnimatedElement {
	
	protected updateStateAnimation() {
		super.updateStateAnimation();

		switch (this.currentState) {
			case AnimationState.ATTACK: {
				this.currentAnimation = this.character.attackState;
				this.directionValue = 1;
				break;
			}
			case AnimationState.WALK: {
				this.currentAnimation = this.character.walkState;
				this.directionValue = 1;
				break;
			}
			case AnimationState.ATTACK_REVERSE: {
				this.currentAnimation = this.character.attackState;
				this.directionValue = -1;
				break;
			}
			case AnimationState.WALK_REVERSE: {
				this.currentAnimation = this.character.walkState;
				this.directionValue = -1;
				break;
			}
		}
	}
}