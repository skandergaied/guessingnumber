import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h2>Guess the Number!</h2>
    <div class="card bg-light mb-3">
      <div class="card-body">
        <p class="card-text">Guess the computer-generated random number between 1 and 1000.</p>
      </div>
    </div>
    <div>
      <label>Your Guess: </label>
      <input type="number" [(ngModel)]="guess" min="1" max="1000" />
      <button (click)="verifyGuess()" class="btn btn-primary btn-sm">Verify</button>
      <button (click)="initializeGame()" class="btn btn-warning btn-sm">Restart</button>
    </div>
    <div *ngIf="message" class="mt-3">
      <p [ngClass]="{'alert-success': deviation === 0, 'alert-warning': deviation !== 0}" class="alert">{{message}}</p>
    </div>
    <p class="text-info mt-3">Number of guesses:
      <span class="badge badge-info">{{noOfTries}}</span>
    </p>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'guessing';
  deviation: number | null = null;
  noOfTries: number = 0;
  original: number = 0;
  guess: number | null = null;
  message: string = '';

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.noOfTries = 0;
    this.original = Math.floor(Math.random() * 1000 + 1);
    this.guess = null;
    this.deviation = null;
    this.message = 'Game initialized. Start guessing!';
  }

  verifyGuess() {
    if (this.guess !== null) {
      this.deviation = this.original - this.guess;
      this.noOfTries++;
      if (this.deviation > 0) {
        this.message = 'Your guess is lower.';
      } else if (this.deviation < 0) {
        this.message = 'Your guess is higher.';
      } else {
        this.message = "Yes! That's it.";
      }
      this.guess = null;
    }
  }
}
