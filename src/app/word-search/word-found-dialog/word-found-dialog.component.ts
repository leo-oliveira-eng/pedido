import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-word-found-dialog',
  template: `
    <h1 mat-dialog-title>Palavra Encontrada!</h1>
    <div mat-dialog-content>
      <p>Você encontrou: <strong>{{ data.word }}</strong></p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Fechar</button>
    </div>
  `,
  styles: [
    `
      h1 {
        color: #ffd700; /* Highlighted color for the dialog title */
      }
      div mat-dialog-content {
        font-size: 1.2em;
      }
      div mat-dialog-actions {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class WordFoundDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { word: string }) {}
}
