import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { WordFoundDialogComponent } from './word-found-dialog/word-found-dialog.component';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss'],
})
export class WordSearchComponent {
  wordGrid: string[][] = [];
  selectedCells: { row: number; col: number }[] = [];
  targetWords = ['ACEITA', 'NAMORAR', 'COMIGO'];
  foundWords: string[] = [];
  allWordsFound = false; // Flag to show "SIM" and "NÃO" buttons
  directions = ['horizontal', 'vertical'];
  highlightedCells: { row: number; col: number }[] = [];
  isDragging = false; // To track if the user is dragging

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.generateGrid();
  }

  generateGrid() {
    const gridSize = 12;
    this.wordGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => '')
    );
  
    this.targetWords.forEach((word) => this.placeWordRandomly(word));
    this.fillRandomLetters();
  }  

  placeWordRandomly(word: string) {
    let placed = false;

    while (!placed) {
      const direction = this.getRandomDirection();
      const { row, col } = this.getRandomStartPosition(word, direction);

      if (this.canPlaceWord(word, row, col, direction)) {
        this.placeWord(word, row, col, direction);
        placed = true;
      }
    }
  }

  onMouseDown(row: number, col: number) {
    this.isDragging = true;
    this.selectedCells = [{ row, col }]; // Start with the initial cell
  }
  
  onMouseEnter(row: number, col: number) {
    if (this.isDragging) {
      // Avoid adding duplicate cells
      if (!this.selectedCells.some((cell) => cell.row === row && cell.col === col)) {
        this.selectedCells.push({ row, col });
      }
    }
  }
  
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.checkWord(); // Finalize the selection
    }
  }  

  getRandomDirection(): string {
    return this.directions[Math.floor(Math.random() * this.directions.length)];
  }

  getRandomStartPosition(word: string, direction: string): { row: number; col: number } {
    const gridSize = this.wordGrid.length;

    switch (direction) {
      case 'horizontal':
        return {
          row: Math.floor(Math.random() * gridSize),
          col: Math.floor(Math.random() * (gridSize - word.length)),
        };
      case 'vertical':
        return {
          row: Math.floor(Math.random() * (gridSize - word.length)),
          col: Math.floor(Math.random() * gridSize),
        };
      case 'diagonal':
        return {
          row: Math.floor(Math.random() * (gridSize - word.length)),
          col: Math.floor(Math.random() * (gridSize - word.length)),
        };
      default:
        return { row: 0, col: 0 };
    }
  }

  canPlaceWord(word: string, row: number, col: number, direction: string): boolean {
    for (let i = 0; i < word.length; i++) {
      const currentRow = direction === 'vertical' || direction === 'diagonal' ? row + i : row;
      const currentCol = direction === 'horizontal' || direction === 'diagonal' ? col + i : col;

      if (
        currentRow >= this.wordGrid.length ||
        currentCol >= this.wordGrid.length ||
        this.wordGrid[currentRow][currentCol] !== ''
      ) {
        return false;
      }
    }
    return true;
  }

  placeWord(word: string, row: number, col: number, direction: string) {
    for (let i = 0; i < word.length; i++) {
      const currentRow = direction === 'vertical' || direction === 'diagonal' ? row + i : row;
      const currentCol = direction === 'horizontal' || direction === 'diagonal' ? col + i : col;

      this.wordGrid[currentRow][currentCol] = word[i];
    }
  }

  fillRandomLetters() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < this.wordGrid.length; i++) {
      for (let j = 0; j < this.wordGrid[i].length; j++) {
        if (this.wordGrid[i][j] === '') {
          this.wordGrid[i][j] =
            alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }

  selectCell(row: number, col: number) {
    const cell = { row, col };
    if (this.selectedCells.some((c) => c.row === row && c.col === col)) {
      this.selectedCells = this.selectedCells.filter(
        (c) => !(c.row === row && c.col === col)
      );
    } else {
      this.selectedCells.push(cell);
    }

    this.checkWord();
  }

  checkWord() {
    if (this.selectedCells.length < 2) {
      return;
    }
  
    const [start, second] = this.selectedCells;
    const direction = this.getSelectionDirection(start, second);
  
    if (!direction) {
      return;
    }
  
    const selectedWord = this.selectedCells
      .map((cell) => this.wordGrid[cell.row][cell.col])
      .join('');
  
    if (this.targetWords.includes(selectedWord)) {
      this.dialog.open(WordFoundDialogComponent, {
        data: { word: selectedWord },
      });
  
      // Add the selected cells to the highlighted list
      this.highlightedCells.push(...this.selectedCells);
  
      this.foundWords.push(selectedWord);
      this.targetWords = this.targetWords.filter((word) => word !== selectedWord);
      this.selectedCells = [];
    }
  
    if (this.foundWords.length === 3) {
      this.allWordsFound = true;
      this.cdr.detectChanges(); // Trigger UI update
    }
  }  

  getSelectionDirection(start: { row: number; col: number }, second: { row: number; col: number }): string | null {
    const rowDiff = second.row - start.row;
    const colDiff = second.col - start.col;

    if (rowDiff === 0 && colDiff > 0) return 'horizontal';
    if (colDiff === 0 && rowDiff > 0) return 'vertical';
    if (rowDiff === colDiff && rowDiff > 0) return 'diagonal';

    return null;
  }

  getSentence(): string {
    const sentenceTemplate = ['ACEITA', 'NAMORAR', 'COMIGO'];
    return sentenceTemplate
      .map((word) =>
        this.foundWords.includes(word) ? word : '_'.repeat(word.length)
      )
      .join(' ') + '?';
  }

  isHighlighted(row: number, col: number): boolean {
    return (
      this.selectedCells.some((cell) => cell.row === row && cell.col === col) ||
      this.highlightedCells.some((cell) => cell.row === row && cell.col === col)
    );
  }
  

  onYesClick() {
    const dialogRef = this.dialog.open(WordFoundDialogComponent, {
      data: { word: 'Que bom! Seremos muito felizes!' },
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.restart(); // Restart the game when the dialog is closed
    });
  }

  restart() {
    this.selectedCells = [];
    this.highlightedCells = [];
    this.foundWords = [];
    this.allWordsFound = false;
    this.targetWords = ['ACEITA', 'NAMORAR', 'COMIGO'];
    this.generateGrid();
  }

  onNoHover(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
  
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
  
    const maxWidth = winWidth - buttonWidth;
    const maxHeight = winHeight - buttonHeight;
  
    let randomTop = 0;
    let randomLeft = 0;
    let currentTop = parseInt(button.style.top.replace('px', ''), 10) || 0;
    let currentLeft = parseInt(button.style.left.replace('px', ''), 10) || 0;
  
    let diffTop = 0;
    let diffLeft = 0;
  
    // Ensure the new position has a minimum distance from the current position
    do {
      randomTop = Math.floor(Math.random() * maxHeight);
      randomLeft = Math.floor(Math.random() * maxWidth);
  
      diffTop = Math.abs(randomTop - currentTop);
      diffLeft = Math.abs(randomLeft - currentLeft);
    } while (diffTop < 200 || diffLeft < 200);
  
    // Apply the new position to the button
    button.style.position = 'fixed';
    button.style.top = `${randomTop}px`;
    button.style.left = `${randomLeft}px`;
  }  
}
