import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QustionListPage } from './qustion-list.page';

describe('QustionListPage', () => {
  let component: QustionListPage;
  let fixture: ComponentFixture<QustionListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QustionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
