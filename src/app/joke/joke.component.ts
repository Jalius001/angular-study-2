import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Joke} from '../beans/Joke';
import {JOKES} from '../mocks/MockJokes';
import set = Reflect.set;

@Component({
  selector: 'app-joke-form',
  template: `
    <div class="card card-block">
      <h4 class="card-title">Create Joke</h4>
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="Enter the setup"
               #setup>
      </div>
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="Enter the punchline"
               #punchline>
      </div>
      <button type="button"
              class="btn btn-primary"
              (click)="createJoke(setup.value, punchline.value)">Create
      </button>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeFormComponent {

  @Output() jokeCreatedEvent = new EventEmitter<Joke>();

  createJoke(setup: string, punchLine: string) {
    this.jokeCreatedEvent.emit(new Joke(setup, punchLine));
  }
}

@Component({
  selector: 'app-joke-item',
  template: `
    <div class="card card-block">
      <h4 class="card-title">{{data.setup}}</h4>
      <p class="card-text"
         [hidden]="data.hide">{{data.punchLine}}</p>
      <a (click)="data.toggle()"
         class="btn btn-warning">Tell Me
      </a>
      <button type="button" class="btn btn-secondary" (click)="starJoke(data)">Star</button>
      <button type="button" class="btn btn-secondary" (click)="deleteJoke(data)">Delete</button>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeItemComponent {
  @Output() jokeDeleteEvent = new EventEmitter<Joke>();
  @Output() jokeStarEvent = new EventEmitter<Joke>();
  @Input('joke') data: Joke;

  deleteJoke(joke: Joke) {
    this.jokeDeleteEvent.emit(joke);
  }

  starJoke(joke: Joke) {
    this.jokeStarEvent.emit(joke);
  }
}

@Component({
  selector: 'app-joke-starred-item',
  template: `
    <div class="card card-block">
      <h2 class="card-title">{{data.setup}}</h2>
      <button type="button" class="btn btn-secondary" (click)="unstarJoke(data)">Unstar</button>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeStarredItemComponent {
  @Output() jokeUnstarEvent = new EventEmitter<Joke>();
  @Input('starredJoke') data: Joke;

  unstarJoke(joke: Joke) {
    this.jokeUnstarEvent.emit(joke);
  }
}

@Component({
  selector: 'app-joke-starred-list',
  template: `
    <div >
      <p>Starred Jokes:</p>
      <app-joke-starred-item *ngFor="let j of starredJokes" [starredJoke]="j"
                           jokeDeleteEvent="unstarJoke($event)"
                             jokeUnstarEvent="unstarJoke($event)"></app-joke-starred-item>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeStarredListComponent implements OnInit {

  private storageKey = 'starredJokes';
  starredJokes: Joke[];

  ngOnInit() {
    try {
      this.starredJokes = JSON.parse(localStorage.getItem(this.storageKey));
    } finally {
      this.starredJokes = [];
    }
  }

  starJoke(joke: Joke) {
    this.starredJokes.unshift(joke);
    localStorage.setItem(this.storageKey, JSON.stringify(this.starredJokes));
  }

  unstarJoke(joke: Joke) {
    const i = this.starredJokes.indexOf(joke);
    if (i) {
      this.starredJokes.splice(i, 1);
    }
  }

}

@Component({
  selector: 'app-joke-list',
  template: `
    <app-joke-starred-list jokeStarEvent="starJoke($event)"></app-joke-starred-list>
    <app-joke-form jokeCreatedEvent="addJoke($event)"></app-joke-form>
    <app-joke-item *ngFor="let j of jokes" [joke]="j" jokeDeleteEvent="deleteJoke($event)"></app-joke-item>`,
  styleUrls: ['joke.component.styl']
})
export class JokeComponent implements OnInit {

  jokes: Joke[];

  ngOnInit() {
    this.jokes = JOKES;
  }

  addJoke(joke: Joke) {
    this.jokes.unshift(joke);
  }

  deleteJoke(joke: Joke) {
    this.jokes.splice(this.jokes.indexOf(joke), 1);
  }

}
