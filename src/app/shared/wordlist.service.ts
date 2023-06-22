import { Injectable } from '@angular/core';
import { MyVocable, Wordlist } from './models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordlistService {
  public wordlists: Wordlist[] = [];

  public wordlistSelectSubject = new Subject<number>();

  constructor() {
    if (localStorage.getItem('wordlists')) {
      this.wordlists = JSON.parse(localStorage.getItem('wordlists'));
    }
  }

  getVocableList(wordlist: number): MyVocable[] {
    let vocableList: MyVocable[] = [];
    for (
      let vocable = 0;
      vocable < this.wordlists[wordlist].items.length;
      vocable++
    ) {
      vocableList.push(
        new MyVocable(
          this.wordlists[wordlist].items[vocable].croatian,
          this.wordlists[wordlist].items[vocable].german,
          '007'
        )
      );
    }
    return vocableList;
  }
}
