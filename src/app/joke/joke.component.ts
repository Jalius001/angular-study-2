import { Component, OnInit } from '@angular/core';

class Joke {
  public setup: string;
  public punchLine: string;
  public hide: boolean;

  constructor(setup: string, punchLine: string) {
    this.setup = setup;
    this.punchLine = punchLine;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.styl']
})
export class JokeComponent implements OnInit {

  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke('What did the cheese say when it should looked in the mirror?', 'Hello-Me (Halloumi)'),
      new Joke('What did the cheese say when it should looked in the mirror?', 'Hello-Me (Halloumi)'),
      new Joke('What did the cheese say when it should looked in the mirror?', 'Hello-Me (Halloumi)')
    ];
  }

  ngOnInit() {
  }

}
