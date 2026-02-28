import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGridComponent } from './books-grid.component';

describe('BooksGridComponent', () => {
  let component: BooksGridComponent;
  let fixture: ComponentFixture<BooksGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
