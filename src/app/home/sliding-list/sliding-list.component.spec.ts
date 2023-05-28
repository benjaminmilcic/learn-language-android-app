/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SlidingListComponent } from './sliding-list.component';

describe('SlidingListComponent', () => {
  let component: SlidingListComponent;
  let fixture: ComponentFixture<SlidingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
