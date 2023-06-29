import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ViewWillEnter } from '@ionic/angular';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.page.html',
  styleUrls: ['./add-word.page.scss'],
})
export class AddWordPage implements ViewWillEnter {
  word: string;
  language: string;

  otherLanguage: string;

  translation = '';

  selectedWordlist;

  notes: {
    word: string;
    language: string;
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    public wordlistService: WordlistService,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      this.word = params['word'];
      this.language = params['language'];
    });
    this.otherLanguage = this.language === '🇭🇷' ? '🇩🇪' : '🇭🇷';
  }

  onConfirm() {
    this.addWordToWordlist();
    this.deleteWordFromNotes();
    this.navCtrl.navigateBack(['/notes']);
  }

  addWordToWordlist() {
    let index = this.wordlistService.wordlists
      .map((wordlist) => {
        return wordlist.name;
      })
      .indexOf(this.selectedWordlist);

    if (index != -1) {
      const german = this.language === '🇩🇪' ? this.word : this.translation;
      const croatian = this.language === '🇩🇪' ? this.translation : this.word;

      this.wordlistService.wordlists[index].items.push({
        german: german,
        croatian: croatian,
      });
    }

    localStorage.setItem(
      'wordlists',
      JSON.stringify(this.wordlistService.wordlists)
    );
  }

  deleteWordFromNotes() {
    this.notes = JSON.parse(localStorage.getItem('notes'));
    const wordToDelete = this.notes
      .map((note) => {
        return note.word;
      })
      .indexOf(this.word);
    this.notes.splice(wordToDelete, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  async onAddWordlist() {
    const alert = await this.alertController.create({
      header: 'Bitte Namen der Wortliste eingeben',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            if (this.wordlistExist(data.wordlist)) {
              const input = alert.getElementsByTagName('input')[0];
              const errorMessage = document.createElement('div');
              errorMessage.textContent = 'Wortliste existiert bereits';
              errorMessage.style.color = 'red';
              input.insertAdjacentElement('afterend', errorMessage);
              return false;
            } else {
              return true;
            }
          },
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
      ],
      inputs: [
        {
          name: 'wordlist',
          type: 'text',
          placeholder: 'Wortliste',
        },
      ],
    });

    await alert.present();

    const { data, role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      this.wordlistService.wordlists.push({
        name: data.values.wordlist,
        items: [],
      });
      this.selectedWordlist = data.values.wordlist;
      localStorage.setItem(
        'wordlists',
        JSON.stringify(this.wordlistService.wordlists)
      );
    }
  }

  wordlistExist(newWordlistName: string): boolean {
    return this.wordlistService.wordlists
      .map((wordlist) => {
        return wordlist.name;
      })
      .includes(newWordlistName);
  }
}
