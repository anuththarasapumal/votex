import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoteShowPage } from './vote-show.page';

describe('VoteShowPage', () => {
  let component: VoteShowPage;
  let fixture: ComponentFixture<VoteShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
