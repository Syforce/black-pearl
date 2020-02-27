import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { App } from './app.component';

import { GameDashboardComponent } from './dashboard/game-dashboard/game-dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { GameComponent } from './game/game.component';
import { CharacterComponent } from './game/character/character.component';
import { StageComponent } from './game/stage/stage.component';

import { ROUTES } from './app.router';

@NgModule({
	declarations: [
		App,
		GameDashboardComponent,
		QuizComponent,
		GameComponent,
		CharacterComponent,
		StageComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		RouterModule.forRoot(ROUTES)
	],
	providers: [
	],
	bootstrap: [App]
})
export class AppModule {}