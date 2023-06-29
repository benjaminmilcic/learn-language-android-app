import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FavoriteService } from 'src/app/shared/favorite.service';
import { SharedService } from 'src/app/shared/shared.service';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.page.html',
  styleUrls: ['./favorites-list.page.scss'],
})
export class FavoritesListPage implements OnInit {
  constructor(
    public favoriteService: FavoriteService,
    private sharedService: SharedService,
    private alertController: AlertController,
    private wordlistService: WordlistService,
    private navController: NavController
  ) {}

  ngOnInit(): void {}

  onRemoveFavorite(index: number) {
    this.favoriteService.removeFavorite(index);
    if (this.favoriteService.favoriteList.length === 0) {
      this.navController.navigateBack('/favorites');
    }
  }

  async onSaveFavToWordlist() {
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
      let items: {
        german: string;
        croatian: string;
      }[] = [];
      for (
        let index = 0;
        index < this.favoriteService.favoriteList.length;
        index++
      ) {
        items.push({
          german: this.favoriteService.favoriteList[index].german,
          croatian: this.favoriteService.favoriteList[index].croatian,
        });
      }
      this.wordlistService.wordlists.push({
        name: data.values.wordlist,
        items: items,
      });
      localStorage.setItem(
        'wordlists',
        JSON.stringify(this.wordlistService.wordlists)
      );
      this.favoriteService.deleteAllFavorites();
      this.sharedService.allDoneFavoriteSubject.next(true);
      this.navController.navigateBack('/favorites');
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
