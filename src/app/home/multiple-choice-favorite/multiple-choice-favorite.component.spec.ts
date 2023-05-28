/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultipleChoiceFavoriteComponent } from './multiple-choice-favorite.component';

describe('MultipleChoiceFavoriteComponent', () => {
  let component: MultipleChoiceFavoriteComponent;
  let fixture: ComponentFixture<MultipleChoiceFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
