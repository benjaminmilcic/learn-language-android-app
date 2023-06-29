import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-wordlists',
  templateUrl: './wordlists.page.html',
  styleUrls: ['./wordlists.page.scss'],
})
export class WordlistsPage implements ViewWillEnter {
  wordlistMode: 'categories' | 'custom' = 'categories';
  constructor(public wordlistService: WordlistService) {}
  ionViewWillEnter() {
    if (this.wordlistMode === 'custom') {
        this.wordlistMode = 'categories';        
    }
  }
}
