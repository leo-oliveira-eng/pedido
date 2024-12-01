import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordFoundDialogComponent } from './word-found-dialog.component';

describe('WordFoundDialogComponent', () => {
  let component: WordFoundDialogComponent;
  let fixture: ComponentFixture<WordFoundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordFoundDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
