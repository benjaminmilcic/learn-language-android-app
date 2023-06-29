import { Component, OnInit } from '@angular/core';
import { AlertController, IonInput } from '@ionic/angular';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-edit-wordlists',
  templateUrl: './edit-wordlists.page.html',
  styleUrls: ['./edit-wordlists.page.scss'],
})
export class EditWordlistsPage implements OnInit {
  selectedWordlist: string;
  wordlistIndex: number = 0;
  constructor(
    private alertController: AlertController,
    public wordlistService: WordlistService
  ) {}

  ngOnInit() {
    this.selectedWordlist = this.wordlistService.wordlists[0].name;
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
      backdropDismiss: false,
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
      backdropDismiss: false,
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
      backdropDismiss: false,
      buttons: [
        {
          text: 'Umbenennen',
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
      this.selectedWordlist =
        this.wordlistService.wordlists[this.wordlistIndex].name;
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
