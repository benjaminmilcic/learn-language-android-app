import { Component, OnInit } from '@angular/core';
import { DatabaseService, MyVocable } from '../shared/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  playAudio = new Audio;
  audioMode: boolean = false;
  audioPath = 'https://www.goethe-verlag.com/book2/_alleima/_mp3/';
  audioLanguage = 'HR';

  vocableList: MyVocable[] = [];

  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.fetchData();
    this.vocableList = this.databaseService.getVocableList();
  }

  onToggleDarkMode() {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }

  onChangeMode(mode: string) {
    if (mode === 'audio') {
      this.audioMode = true;
    } else {
      this.audioMode = false;
    }
  }

  onPlayAudio() {
    this.playAudio.src = this.audioPath + this.audioLanguage + '/' + '0001' + '.mp3';
    this.playAudio.play();
  }
}
