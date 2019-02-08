import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent }  from './app.component';
import { ArticleComponent }  from './components/article.component';
import { reducers, metaReducers } from './reducers/reducers';
import { ArticleEffects } from './effects/article.effects';
import { ArticleService } from './services/article.service';

//For InMemory testing
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TestData } from './test-data';

@NgModule({
  imports: [     
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      StoreModule.forRoot(reducers, {metaReducers}),
      EffectsModule.forRoot([ArticleEffects]),
      InMemoryWebApiModule.forRoot(TestData)
  ],
  declarations: [
      AppComponent,
	  ArticleComponent
  ],
  providers: [
      ArticleService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
