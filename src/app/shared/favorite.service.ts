import { Injectable } from '@angular/core';
import { MyVocable } from './models';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favoriteList: MyVocable[] = [];

  constructor() {}

  toggleFavorite(wordToPractice: MyVocable) {
    let index = this.favoriteList
      .map((word) => word.audio)
      .indexOf(wordToPractice.audio);
    if (index === -1) {
      this.addFavorite(wordToPractice);
    } else {
      this.removeFavorite(index);
    }
  }

  addFavorite(wordToPractice: MyVocable) {
    this.favoriteList.push(wordToPractice);
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }

  removeFavorite(index: number) {
    this.favoriteList.splice(index, 1);
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }

  deleteAllFavorites() {
    this.favoriteList = [];
    localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }
}
