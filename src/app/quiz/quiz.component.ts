import { Component } from '@angular/core';

import { GameService } from '../shared/service/game.service';

import { Quiz } from './model/quiz.model';
import { Question } from './model/question.model';
import { Answer } from './model/answer.model';

@Component({
	selector: 'quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
	private gameService: GameService;
	private quiz: Quiz;

	public activeQuestion: Question;

	constructor(gameService: GameService) {
		this.gameService = gameService;

		this.quiz = {
			questions: [{
				text: 'What color is red ?',
				answers: [{
					text: 'Blue',
					correct: false
				}, {
					text: 'Yellow',
					correct: false
				}, {
					text: 'Red',
					correct: true
				}]
			}]
		};

		this.activeQuestion = this.quiz.questions[0];
	}

	public onAnswerClick(answer: Answer) {
		this.gameService.setAnswer(answer);

		if (answer.correct) {
		}
	}
}