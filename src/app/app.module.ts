import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { WordSearchComponent } from './word-search/word-search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WordFoundDialogComponent } from './word-search/word-found-dialog/word-found-dialog.component';

@NgModule({
  declarations: [AppComponent, WordSearchComponent, WordFoundDialogComponent],
  imports: [
    BrowserModule, 
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
