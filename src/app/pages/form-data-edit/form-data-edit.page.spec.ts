import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDataEditPage } from './form-data-edit.page';

describe('FormDataEditPage', () => {
  let component: FormDataEditPage;
  let fixture: ComponentFixture<FormDataEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
