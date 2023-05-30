import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { FavoriteService } from 'src/app/shared/favorite.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements ViewWillEnter {
  constructor(
    private sharedService: SharedService,
    private favoriteService: FavoriteService
  ) {}

  ionViewWillEnter() {
    this.sharedService.allDoneFavoriteSubject.next(false);
    this.sharedService.loadFavoriteListSubject.next(
      this.favoriteService.favoriteList
    );
  }
}
