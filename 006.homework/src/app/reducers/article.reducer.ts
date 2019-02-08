import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/article.actions';
import { ArticleState } from './app.states';

export const initialState: ArticleState = { articles: [], message: ''};

export function reducer(state = initialState, action: fromActions.ALL_REDUCER_ACTIONS): ArticleState {
  switch(action.type) {
    case fromActions.SHOW_ALL_SUCCESS: {
      return {articles: action.payload, message: 'Success'};
    }
    case fromActions.CREATE_SUCCESS: {
      return {articles: [action.payload], message: 'Article Created.'};
    } 
    case fromActions.CREATE_FAILURE: {
      return {articles: [], message: action.payload};
    }
    case fromActions.GET_BY_ID_SUCCESS: {
      console.log(action.payload);
      return {articles: action.payload, message: 'Success'};
    }   
    case fromActions.RESET: {
      return { articles: [], message: ''};
    }  
    default: {
      return state;
    }
  }	
}

export const getArticleState = createFeatureSelector<ArticleState>('articleState');

export const getArticles = createSelector(
    getArticleState, 
    (state: ArticleState) => state.articles 
);

export const getMessage = createSelector(
  getArticleState, 
  (state: ArticleState) => state.message
);