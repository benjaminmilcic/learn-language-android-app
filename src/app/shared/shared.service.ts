import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyVocable } from './models';
import { FavoriteService } from './favorite.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _vocableList: MyVocable[] = [];

  allDoneSubject = new Subject<boolean>();

  loadVocableListSubject = new Subject<MyVocable[]>();
  loadFavoriteListSubject = new Subject<MyVocable[]>();

  vocableListChangeSubject = new Subject<MyVocable[]>();

  practiceMode: 'default' | 'custom' = 'default';

  constructor(private favoriteService: FavoriteService) {}

  set vocableList(vocableList: MyVocable[]) {
    this._vocableList = vocableList;
  }

  get vocableList() {
    return this._vocableList;
  }
}
