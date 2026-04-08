import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { BooksSearchEffects } from './books.effects';

describe('BooksSearchEffects', () => {
  let actions$: Observable<Action>;
  let effects: BooksSearchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksSearchEffects,
        provideMockActions(() => {
          actions$ = new Observable();
          return actions$;
        }),
      ],
    });

    effects = TestBed.inject(BooksSearchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
