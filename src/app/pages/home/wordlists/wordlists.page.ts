import { Component } from '@angular/core';

@Component({
  selector: 'app-wordlists',
  templateUrl: './wordlists.page.html',
  styleUrls: ['./wordlists.page.scss'],
})
export class WordlistsPage {
  wordlistMode: 'categories' | 'custom' = 'categories';

}
