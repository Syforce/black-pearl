import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { GameService } from '../shared/service/game.service';

import { CharacterComponent } from './character/character.component';
import { StageComponent } from './stage/stage.component';

import { AnimationState } from './model/enum/animation-state.enum';

import { Transition } from './model/transition.model';
import { Answer } from '../quiz/model/answer.model';

import { HERO } from './config/hero.config';
import { GOLEM } from './config/golem.config';
import { FOREST } from './config/forest.config';

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

	constructor(gameService: GameService) {
		this.gameService = gameService;

		this.initListeners();
	}

	private init() {
		setTimeout(() => {
			for (let i = 0; i < this.transitions.length; i++) {
				this.transitions[i].nextTick();
			}

			this.init();
		}, 25);
	}

	private initListeners() {
		this.gameService.answerObservable.subscribe(this.onAnswerReceived.bind(this));
	}

	private animateIntroStage1() {
		const forestTransition: Transition = new Transition();
		forestTransition.setElement(this.forest).setState(AnimationState.IDLE)
			.moveTo(-430, 0, 7000);

		const heroTransition: Transition = new Transition();
		heroTransition.setElement(this.hero)
			.moveTo(230, 100, 7000).setState(AnimationState.WALK, 2, 7000)
			.setState(AnimationState.IDLE, 1, 1, 7000)
			// .moveTo(280, 100, 500, 7050).setState(AnimationState.ATTACK, 3, 500, 7050)
			// .setState(AnimationState.IDLE, 1, 1, 7550)
			// .moveTo(100, 100, 2000, 9000).setState(AnimationState.WALK_REVERSE, 2, 2000, 9000)
			// .setState(AnimationState.IDLE, 1, 1, 11000);

		const golemTransition: Transition = new Transition();
		golemTransition.setElement(this.golem)
			.setState(AnimationState.IDLE).moveTo(390, 100, 5000, 2000);

		this.transitions.push(forestTransition);
		this.transitions.push(heroTransition);
		this.transitions.push(golemTransition);

		forestTransition.play();
		heroTransition.play();
		golemTransition.play();
		this.init();

		setTimeout(() => {
			this.transitions = [];
		}, 8000);


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
			const heroTransition: Transition = new Transition();
			heroTransition.setElement(this.hero)
				.moveTo(280, 100, 500)
				.setState(AnimationState.WALK, 1, 500)
				.setState(AnimationState.ATTACK, 2, 500, 500)
				.setState(AnimationState.IDLE, 1, 1, 1000)
				.moveTo(230, 100, 1000, 1500)
				.setState(AnimationState.WALK_REVERSE, 3, 1000, 1500)
				.setState(AnimationState.IDLE, 1, 1, 2500)
				// .moveTo(100, 100, 2000, 9000).setState(AnimationState.WALK_REVERSE, 2, 2000, 9000)
				// .setState(AnimationState.IDLE, 1, 1, 11000);

			heroTransition.play();
			this.transitions.push(heroTransition);
			
			setTimeout(() => {
				this.transitions = [];
			}, 2600)

		} else {
			// animate damage
		}
	}
}