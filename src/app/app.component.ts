import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordSearchComponent } from "./word-search/word-search.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jogo';
}
