import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSectionComponent } from './client-section';
import { FormControl, FormGroup } from '@angular/forms';

describe('ClientSectionComponent', () => {
  let component: ClientSectionComponent;
  let fixture: ComponentFixture<ClientSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSectionComponent);
    component = fixture.componentInstance;

    component.group = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
