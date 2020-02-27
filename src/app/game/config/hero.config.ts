import { Character } from '../model/character.model';

export const HERO: Character = {
	spriteName: 'dark-knight',
	idleState: {
		frames: [{
			x: 0,
			y: -10,
			width: 160,
			height: 160
		}]
	},
	attackState: {
		frames: [{
			x: 0,
			y: -10,
			width: 160,
			height: 160
		}, {
			x: -170,
			y: -10,
			width: 160,
			height: 160
		}, {
			x: -337,
			y: -10,
			width: 160,
			height: 160
		}, {
			x: -530,
			y: -10,
			width: 160,
			height: 160
		}, {
			x: -660,
			y: -10,
			width: 160,
			height: 160
		}, {
			x: -810,
			y: -10,
			width: 160,
			height: 160
		}]
	},
	walkState: {
		frames: [{
			x: 0,
			y: -155,
			width: 160,
			height: 160
		}, {
			x: -170,
			y: -155,
			width: 160,
			height: 160
		}, {
			x: -337,
			y: -155,
			width: 160,
			height: 160
		}, {
			x: -525,
			y: -155,
			width: 160,
			height: 160
		}, {
			x: -709,
			y: -155,
			width: 160,
			height: 160
		}, {
			x: -3,
			y: -300,
			width: 160,
			height: 160
		}]
	}
};