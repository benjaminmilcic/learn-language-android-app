import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Chapter {
  german: string,
  croatian: string,
  chapterNr: string,
  vocables: Vocable[]
}

interface Vocable {
  german: string,
  croatian: string,
  imagePath: string,
  audioNr: string,
  chapterIndex: number,
  checked: boolean
}

export class MyVocable {
  constructor(
    public croatian: string,
    public german: string,
    public audio: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: Chapter[] = [];
  public databaseLoaded = false;

  public categories: string[] = [];

  public vocableList: MyVocable[];

  constructor(private http: HttpClient) { }

  fetchData() {
    this.http.get<Chapter[]>('https://vocabularyinputapp-default-rtdb.europe-west1.firebasedatabase.app/exampleDatabase.json').subscribe(data => {
      this.database = data;
    },
      error => {
        throw new Error(error);
      },
      () => {
        this.categories = this.getCategoyList();
        this.setVocableList(0);
        this.databaseLoaded = true;
      });
  }

  private getCategoyList() {
    let categories: string[] = [];
    for (let chapter = 0; chapter < this.database.length; chapter++) {
      categories.push(this.database[chapter].german);
    }
    return categories;
  }

  setVocableList(chapter: number) {
    this.vocableList = [];
    for (
      let vocable = 0;
      vocable < this.database[chapter].vocables.length;
      vocable++
    ) {
      this.vocableList.push(
        new MyVocable(
          this.database[chapter].vocables[vocable].croatian,
          this.database[chapter].vocables[vocable].german,
          this.database[chapter].vocables[vocable].audioNr
        )
      );
    }
    console.log(this.vocableList);
  }

  getVocableList() {
    return this.vocableList;
  }
}
