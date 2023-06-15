import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-modal-add-word',
  templateUrl: './modal-add-word.component.html',
  styleUrls: ['./modal-add-word.component.scss'],
})
export class ModalAddWordComponent implements OnInit {
  @Input() word: string;
  @Input() language: string;

  otherLanguage: string;

  translation = '';

  selectedWordlist;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    public wordlistService: WordlistService
  ) {}

  ngOnInit() {
    this.otherLanguage = this.language === '🇭🇷' ? '🇩🇪' : '🇭🇷';
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onConfirm() {
    let index = this.wordlistService.wordlist
      .map((wordlist) => {
        return wordlist.name;
      })
      .indexOf(this.selectedWordlist);

    if (index != -1) {
      const german = this.language === '🇩🇪' ? this.word : this.translation;
      const croatian = this.language === '🇩🇪' ? this.translation : this.word;

      this.wordlistService.wordlist[index].items.push({
        german: german,
        croatian: croatian,
      });
    }
    
    localStorage.setItem(
      'wordlists',
      JSON.stringify(this.wordlistService.wordlist)
    );

    this.modalCtrl.dismiss(this.word, 'confirm');
  }

  async onAddWordlist() {
    const alert = await this.alertController.create({
      header: 'Bitte Namen der Wortliste eingeben',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
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
      this.wordlistService.wordlist.push({
        name: data.values.wordlist,
        items: [],
      });
      this.selectedWordlist = data.values.wordlist;
      localStorage.setItem(
        'wordlists',
        JSON.stringify(this.wordlistService.wordlist)
      );
    }
  }
}
