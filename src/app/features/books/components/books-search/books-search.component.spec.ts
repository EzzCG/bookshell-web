import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSearchComponent } from './books-search.component';

describe('BooksSearchComponent', () => {
  let component: BooksSearchComponent;
  let fixture: ComponentFixture<BooksSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
