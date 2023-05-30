import { Component } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  languageFlag: string = '🇩🇪';
  language: 'german' | 'croatian' = 'german';
  note = '';
  notes: string[] = [];

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
    this.notes.push(this.note);
    this.note = '';
  }
}
