import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { GameService } from '../shared/service/game.service';

import { CharacterComponent } from './character/character.component';
import { StageComponent } from './stage/stage.component';

import { AnimationState } from './model/enum/animation-state.enum';

import { Transition } from './model/transition.model';
import { Tween } from './model/tween.model';
import { Answer } from '../quiz/model/answer.model';

import { HERO } from './config/hero.config';
import { GOLEM } from './config/golem.config';
import { FOREST } from './config/forest.config';
import { FOX } from './config/fox.config';

@Component({
	selector: 'game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
	private gameService: GameService;

	public HERO = HERO;
	public GOLEM = GOLEM;
	public FOREST = FOREST;
	public FOX = FOX;

	@ViewChild('hero', { static: true })
	public hero: CharacterComponent;

	@ViewChild('golem', { static: true })
	public golem: CharacterComponent;

	@ViewChild('forest', { static: true })
	public forest: CharacterComponent;

	ngAfterViewInit() {
		this.animateIntroStage1();
	}

	private transitions: Array<Transition> = new Array<Transition>();

	private tweens: Array<Tween> = new Array<Tween>();

	constructor(gameService: GameService) {
		this.gameService = gameService;

		this.initListeners();
		this.init();
	}

	private init() {
		setTimeout(() => {
			// for (let i = 0; i < this.transitions.length; i++) {
			// 	this.transitions[i].nextTick();
			// }

			this.tweens.forEach((tween: Tween) => {
				tween.nextTick();
			});

			this.init();
		}, 25);
	}

	private initListeners() {
		this.gameService.answerObservable.subscribe(this.onAnswerReceived.bind(this));
	}

	private animateIntroStage1() {
		const tweens: Array<Tween> = new Array<Tween>();
		const forestTween: Tween = new Tween(this.forest)
			.setState(AnimationState.IDLE, 1, 0, 1)
			.moveTo(-1250, 0, 3000)
			.moveTo(-1450, 0, 400, 6000)

		const heroTween: Tween = new Tween(this.hero)
			.setState(AnimationState.WALK, 2, 3000)
			.moveTo(230, 50, 3000)
			.setState(AnimationState.IDLE, 2, 0, 0, 3000)
			.moveTo(40, 50, 400, 6000)

		const enemyTween: Tween = new Tween(this.golem)
			.setState(AnimationState.IDLE, 2)
			.moveTo(500, 50, 400, 6000)

		tweens.push(forestTween);
		tweens.push(heroTween);
		tweens.push(enemyTween);

		this.tweens = tweens;

		// const forestTransition: Transition = new Transition();
		// forestTransition.setElement(this.forest).setState(AnimationState.IDLE)
		// 	.moveTo(-430, 0, 7000);

		// const heroTransition: Transition = new Transition();
		// heroTransition.setElement(this.hero)
		// 	.moveTo(230, 100, 7000).setState(AnimationState.WALK, 2, 7000)
		// 	.setState(AnimationState.IDLE, 1, 1, 7000)
		// 	// .moveTo(280, 100, 500, 7050).setState(AnimationState.ATTACK, 3, 500, 7050)
		// 	// .setState(AnimationState.IDLE, 1, 1, 7550)
		// 	// .moveTo(100, 100, 2000, 9000).setState(AnimationState.WALK_REVERSE, 2, 2000, 9000)
		// 	// .setState(AnimationState.IDLE, 1, 1, 11000);

		// const golemTransition: Transition = new Transition();
		// golemTransition.setElement(this.golem)
		// 	.setState(AnimationState.IDLE).moveTo(390, 100, 5000, 2000);

		// this.transitions.push(forestTransition);
		// this.transitions.push(heroTransition);
		// this.transitions.push(golemTransition);

		// forestTransition.play();
		// heroTransition.play();
		// golemTransition.play();
		// this.init();

		// setTimeout(() => {
		// 	this.transitions = [];
		// }, 8000);


		// this.stage.pan(7000);

		// this.hero.setState(AnimationState.ATTACK);
		// this.hero.moveTo(200, 100, 7000);

		// this.golem.setState(AnimationState.IDLE);

		// setTimeout(() => {
		// 	this.golem.moveTo(400, 100, 2500);
		// }, 4500);

		// setTimeout(() => {
		// 	this.hero.setState(AnimationState.IDLE);
		// }, 7000);
	}

	private onAnswerReceived(answer: Answer) {
		if (answer.correct) {
			// animate attack
			// const heroTransition: Transition = new Transition();
			// heroTransition.setElement(this.hero)
			// 	.moveTo(280, 100, 500)
			// 	.setState(AnimationState.WALK, 1, 500)
			// 	.setState(AnimationState.ATTACK, 3, 325, 500)
			// 	.setState(AnimationState.IDLE, 1, 1, 825)
			// 	.moveTo(230, 100, 1000, 1100)
			// 	.setState(AnimationState.WALK_REVERSE, 3, 1000, 1100)
			// 	.setState(AnimationState.IDLE, 1, 1, 2100)
			// 	// .moveTo(100, 100, 2000, 9000).setState(AnimationState.WALK_REVERSE, 2, 2000, 9000)
			// 	// .setState(AnimationState.IDLE, 1, 1, 11000);

			// heroTransition.play();
			// this.transitions.push(heroTransition);

			const heroTween: Tween = new Tween(this.hero)
				.moveTo(280, 100, 500)
				.setState(AnimationState.WALK, 1, 500, 0)
				.setState(AnimationState.ATTACK, 1, 0, 1, 500)
				.setState(AnimationState.IDLE, 1, 0, 1, 700)


			this.tweens.push(heroTween);


			// setTimeout(() => {
			// 	this.transitions = [];
			// }, 2600)

		} else {
			// animate damage
		}
	}
}