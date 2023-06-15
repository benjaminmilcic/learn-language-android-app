import { Injectable } from '@angular/core';
import { MyVocable, Wordlist } from './models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordlistService {
  public wordlist: Wordlist[] = [];

  public wordlistSelectSubject = new Subject<number>;

  constructor() {
    if (localStorage.getItem('wordlists')) {
      this.wordlist = JSON.parse(localStorage.getItem('wordlists'));
    }
  }

  getVocableList(wordlist: number): MyVocable[] {
    let vocableList: MyVocable[] = [];
    for (
      let vocable = 0;
      vocable < this.wordlist[wordlist].items.length;
      vocable++
    ) {
      vocableList.push(
        new MyVocable(
          this.wordlist[wordlist].items[vocable].croatian,
          this.wordlist[wordlist].items[vocable].german,
          '007'
        )
      );
    }
    return vocableList;
  }
}
