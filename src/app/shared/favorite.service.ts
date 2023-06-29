import { Injectable } from '@angular/core';
import { MyVocable } from './models';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favoriteList: MyVocable[] = [];

  constructor() {}

  shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  vocableIsInFavoriteList(wordToPractice: MyVocable): boolean {
    if (this.getIndexOfFavorite(wordToPractice) > -1) {
      return true;
    } else {
      return false;
    }
    
  }

  getIndexOfFavorite(wordToPractice: MyVocable): number {
    for (let index = 0; index < this.favoriteList.length; index++) {
      let isInFavoriteList = this.shallowEqual(
        this.favoriteList[index],
        wordToPractice
      );
      if (isInFavoriteList) {
        return index;
      }
    }
    return -1;
  }

  toggleFavorite(wordToPractice: MyVocable) {
    let index = this.getIndexOfFavorite(wordToPractice);
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
