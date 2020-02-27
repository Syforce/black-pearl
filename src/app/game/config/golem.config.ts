import { Character } from '../model/character.model';

export const GOLEM: Character = {
	spriteName: 'golem',
	walkState: {
		frames: [{
			x: -1165,
			y: 0,
			width: 140,
			height: 130
		}]
	},
	attackState: {
		frames: []
	},
	idleState: {
		frames: [{
			x: -1165,
			y: 0,
			width: 140,
			height: 130
		}]
	}
}