import { Character } from '../model/character.model';

export const FOREST: Character = {
	spriteName: 'forest',
	idleState: {
		frames: [{
			x: 0,
			y: 0,
			width: 2800,
			height: 350
		}]
	},
	attackState: {
		frames: []
	},
	walkState: {
		frames: []
	}
}