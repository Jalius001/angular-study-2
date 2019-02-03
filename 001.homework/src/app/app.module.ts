import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, Input, Output } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { JokeComponent, JokeItemComponent, JokeFormComponent, JokeStarredListComponent, JokeStarredItemComponent } from './joke/joke.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    JokeComponent,
    JokeItemComponent,
    JokeFormComponent,
    JokeStarredListComponent,
    JokeStarredItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
