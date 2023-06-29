import { Component } from '@angular/core';
import {  NavigationExtras } from '@angular/router';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { NavController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements ViewWillEnter {
  languageFlag: string = '🇩🇪';
  language: 'german' | 'croatian' = 'german';
  note = '';
  notes: {
    word: string;
    language: string;
  }[] = [];

  constructor(private navCtrl: NavController) {}

  ionViewWillEnter() {
    if (localStorage.getItem('notes')) {
      this.notes = JSON.parse(localStorage.getItem('notes'));
    }
  }

  onToggleLanguage() {
    this.language = this.language === 'german' ? 'croatian' : 'german';
    this.languageFlag = this.language === 'german' ? '🇩🇪' : '🇭🇷';
  }

  async onSpeech() {
    const { available } = await SpeechRecognition.available();
    if (available) {
      const speechLanguage = this.language === 'german' ? 'de-DE' : 'hr-HR';
      await SpeechRecognition.start({
        popup: true,
        language: speechLanguage,
        partialResults: false,
        prompt: 'Notiz einsprechen',
        maxResults: 1,
      }).then((data) => {
        this.note = data.matches[0];
      });
    }
  }

  onAddNote() {
    this.notes.push({ word: this.note, language: this.languageFlag });
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.note = '';
  }

  onDeleteNote(index: number) {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  async onSelectWord(word: string, language: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        word: word,
        language: language,
      },
    };
    this.navCtrl.navigateForward(['/notes/add-word'], navigationExtras);
  }
}
