import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Component, Input, Output, OnInit, EventEmitter, OnDestroy} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Joke } from '../beans/Joke';
import { JOKES } from '../mocks/MockJokes';
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
      <h4 class="card-title">{{joke.setup}}</h4>
      <p class="card-text"
         [hidden]="joke.hide">{{joke.punchLine}}</p>
      <a (click)="joke.toggle()"
         class="btn btn-warning">Tell Me
      </a>
      <button type="button" class="btn btn-secondary" (click)="starJoke(joke)">Star</button>
      <button type="button" class="btn btn-secondary" (click)="deleteJoke(joke)">Delete</button>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeItemComponent {
  @Output() jokeDeleteEvent = new EventEmitter<Joke>();
  @Output() jokeStarEvent = new EventEmitter<Joke>();
  @Input() joke: Joke;

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
      <h4 class="card-title">{{joke.setup}}</h4>
      <button type="button" class="btn btn-secondary" (click)="unstarJoke(joke)">Unstar</button>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeStarredItemComponent {
  @Output() jokeUnstarEvent = new EventEmitter<Joke>();
  @Input() joke: Joke;

  unstarJoke(joke: Joke) {
    this.jokeUnstarEvent.emit(joke);
  }
}

@Component({
  selector: 'app-joke-starred-list',
  template: `
    <div>
      <p>Starred Jokes:</p>
      <app-joke-starred-item *ngFor="let j of jokes" [joke]="j" (jokeUnstarEvent)="unstarJoke($event)"></app-joke-starred-item>
    </div>`,
  styleUrls: ['joke.component.styl']
})
export class JokeStarredListComponent implements OnInit {
  @Output() jokeListUnstarEvent = new EventEmitter<Joke>();
  @Input() jokes: Joke[];

  ngOnInit() {
  }

  unstarJoke(joke: Joke) {
    this.jokeListUnstarEvent.emit(joke);
  }
}

@Component({
  selector: 'app-joke-list',
  template: `
    <app-joke-starred-list [jokes]="starredJokes"
                   (jokeListUnstarEvent)="unstarJoke($event)"></app-joke-starred-list>
    <app-joke-form (jokeCreatedEvent)="addJoke($event)"></app-joke-form>
    <app-joke-item *ngFor="let j of jokes" [joke]="j"
                   (jokeStarEvent)="starJoke($event)"
                   (jokeDeleteEvent)="deleteJoke($event)"></app-joke-item>`,
  styleUrls: ['joke.component.styl']
})
export class JokeComponent implements OnInit, OnDestroy {
  private storageKey = 'jokes';
  jokes: Joke[];
  starredJokes: Joke[];

  ngOnInit() {
    this.jokes = JOKES;
    try {
      this.starredJokes = JSON.parse(localStorage.getItem(this.storageKey));
    } catch (e) {
      console.debug(e);
      this.starredJokes = [];
    } finally { }
  }

  ngOnDestroy(): void {
    this.saveStarredJokes();
  }

  addJoke(joke: Joke) {
    this.jokes.unshift(joke);
  }

  deleteJoke(joke: Joke) {
    this.unstarJoke(joke);
    this.jokes.splice(this.jokes.indexOf(joke), 1);
  }

  starJoke(joke: Joke) {
    const idx = this.starredJokes.indexOf(joke);
    if (idx < 0) {
      this.starredJokes.unshift(joke);
      this.saveStarredJokes();
    }
  }

  unstarJoke(joke: Joke) {
    const idx = this.starredJokes.indexOf(joke);
    if (idx >= 0) {
      this.starredJokes.splice(idx, 1);
      this.saveStarredJokes();
    }
  }

  saveStarredJokes() {
    if (localStorage.getItem(this.storageKey)) {
      localStorage.removeItem(this.storageKey);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.starredJokes));
  }
}
