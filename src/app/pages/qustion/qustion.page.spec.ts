import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QustionPage } from './qustion.page';

describe('QustionPage', () => {
  let component: QustionPage;
  let fixture: ComponentFixture<QustionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QustionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
