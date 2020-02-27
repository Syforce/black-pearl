import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Answer } from '../../quiz/model/answer.model';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	private answerSubject: Subject<Answer> = new Subject<Answer>();
	public answerObservable: Observable<Answer> = this.answerSubject.asObservable();

	public setAnswer(answer: Answer) {
		this.answerSubject.next(answer);
	}
}