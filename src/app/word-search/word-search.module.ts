import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSearchComponent } from './word-search.component';
import { WordFoundDialogComponent } from './word-found-dialog/word-found-dialog.component';

@NgModule({
  declarations: [WordSearchComponent, WordFoundDialogComponent],
  imports: [CommonModule], 
  exports: [WordSearchComponent, WordFoundDialogComponent]
})
export class WordSearchModule {}
