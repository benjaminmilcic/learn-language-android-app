import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MyVocable } from './models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _vocableList: MyVocable[] = [];

  allDoneSubject = new Subject<boolean>;

  loadVocableListSubject = new Subject<MyVocable[]>;

  vocableListChangeSubject = new Subject<MyVocable[]>;


  constructor() { }

  set vocableList(vocableList: MyVocable[]) {
    this._vocableList = vocableList;
  }

  get vocableList() {
    return this._vocableList;
  }

}
