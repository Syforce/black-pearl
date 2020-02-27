import { Component, ElementRef } from '@angular/core';

@Component({
	selector: 'stage',
	templateUrl: './stage.component.html',
	styleUrls: ['./stage.component.scss']
})
export class StageComponent {
	private ref: ElementRef;

	constructor(ref: ElementRef) {
		this.ref = ref;
	}

	public pan(time: number) {
		this.animateMoveMap(time);
	}

	private animateMoveMap(time: number) {
		const style = this.ref.nativeElement.style;
		let counter = time / 25;
		let position = 0;

		const intervalId = setInterval(() => {
			if (--counter == 0) {
				clearInterval(intervalId);
			}

			style['background-position-x'] = `${position++ * -3}px`;
		}, 25);
	}
}