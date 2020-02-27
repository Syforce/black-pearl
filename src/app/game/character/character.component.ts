import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import { AnimatedCharacter } from '../base/animated-character.abstract';

@Component({
	selector: 'character',
	templateUrl: './character.component.html',
	styleUrls: ['./character.component.scss']
})
export class CharacterComponent extends AnimatedCharacter {
	constructor(ref: ElementRef) {
		super(ref);
	}
}