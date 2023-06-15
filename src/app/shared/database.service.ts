import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chapter, MyVocable } from './models';
import { BehaviorSubject } from 'rxjs';

import databaseJson from 'src/assets/database.json';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: Chapter[] = [];
  public databaseLoaded = false;
  public categories: string[] = [];

  public categorySelectSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  fetchData() {
    let fromInternet = false;

    if (fromInternet) {
      this.http
        .get<Chapter[]>(
          'https://vocabularyinputapp-default-rtdb.europe-west1.firebasedatabase.app/exampleDatabase.json'
        )
        .subscribe(
          (data) => {
            this.database = data;
          },
          (error) => {
            throw new Error(error);
          },
          () => {
            this.categories = this.getCategoyList();
            this.databaseLoaded = true;
          }
        );
    } else {
      this.database = <Chapter[]>databaseJson;
      this.categories = this.getCategoyList();
      this.databaseLoaded = true;
    }
  }

  private getCategoyList() {
    let categories: string[] = [];
    for (let chapter = 0; chapter < this.database.length; chapter++) {
      categories.push(this.database[chapter].german);
    }
    return categories;
  }

  getVocableList(chapter: number): MyVocable[] {
    let vocableList: MyVocable[] = [];
    for (
      let vocable = 0;
      vocable < this.database[chapter].vocables.length;
      vocable++
    ) {
      vocableList.push(
        new MyVocable(
          this.database[chapter].vocables[vocable].croatian,
          this.database[chapter].vocables[vocable].german,
          this.database[chapter].vocables[vocable].audioNr
        )
      );
    }
    return vocableList;
  }
}
