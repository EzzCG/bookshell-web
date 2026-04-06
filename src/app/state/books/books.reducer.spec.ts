import { Action } from '@ngrx/store';
import { initialState, booksReducer } from './books.reducer';

describe('Books Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = booksReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
