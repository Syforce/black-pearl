import { Animation } from './animation.model';

export class Character {
	public spriteName: string;
	public idleState: Animation;
	public attackState: Animation;
	public walkState: Animation;
}