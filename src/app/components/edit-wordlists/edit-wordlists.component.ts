import { Component, OnInit } from '@angular/core';
import { AlertController, IonInput, ModalController } from '@ionic/angular';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-edit-wordlists',
  templateUrl: './edit-wordlists.component.html',
  styleUrls: ['./edit-wordlists.component.css'],
})
export class EditWordlistsComponent implements OnInit {
  selectedWordlist: string;
  wordlistIndex: number = 0;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    public wordlistService: WordlistService
  ) {}

  ngOnInit() {
    this.selectedWordlist = this.wordlistService.wordlists[0].name;
  }

  onBack() {
    this.modalController.dismiss();
  }

  onChangeWordlist() {
    this.wordlistIndex = this.wordlistService.wordlists
      .map((wordlist) => {
        return wordlist.name;
      })
      .indexOf(this.selectedWordlist);
  }

  async onDeleteWord(index: number) {
    const alert = await this.alertController.create({
      subHeader: 'Wort löschen?',
      message: 'Achtung! Diese Aktion kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          text: 'Löschen',
          role: 'confirm',
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      this.wordlistService.wordlists[this.wordlistIndex].items.splice(index, 1);
      localStorage.setItem(
        'wordlists',
        JSON.stringify(this.wordlistService.wordlists)
      );
    }
  }

  onInputFocused(input: IonInput) {
    input.color = 'danger';
  }

  onInputBlured(input: IonInput) {
    input.color = 'default';
  }

  async onDeleteWordlist() {
    const alert = await this.alertController.create({
      subHeader: 'Wortliste löschen?',
      message: 'Achtung! Diese Aktion kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          text: 'Löschen',
          role: 'confirm',
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      this.wordlistService.wordlists.splice(this.wordlistIndex, 1);
      localStorage.setItem(
        'wordlists',
        JSON.stringify(this.wordlistService.wordlists)
      );
      if (this.wordlistService.wordlists.length > 0) {
        this.selectedWordlist = this.wordlistService.wordlists[0].name;
      }
    }
  }

  async onEditWordlist() {
    const alert = await this.alertController.create({
      header: 'Neuer Name für Wortliste:',
      subHeader: this.selectedWordlist,
      buttons: [
        {
          text: 'Umbenennen',
          role: 'confirm',
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
          placeholder: 'Neuer Name',
        },
      ],
    });

    await alert.present();

    const { data, role } = await alert.onDidDismiss();

    if (role === 'confirm') {
      this.wordlistService.wordlists[this.wordlistIndex].name =
        data.values.wordlist;
      localStorage.setItem(
        'wordlists',
        JSON.stringify(this.wordlistService.wordlists)
      );
      this.selectedWordlist = this.wordlistService.wordlists[this.wordlistIndex].name;
    }
  }
}
