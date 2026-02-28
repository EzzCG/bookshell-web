import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPageComponent } from './books-page.component';

describe('BooksPageComponent', () => {
  let component: BooksPageComponent;
  let fixture: ComponentFixture<BooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
