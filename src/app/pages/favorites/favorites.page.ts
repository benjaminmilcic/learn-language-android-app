import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/shared/favorite.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit, ViewWillEnter {
  allDone = false;
  allDoneFavoriteSubscription: Subscription;

  constructor(
    private sharedService: SharedService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.allDoneFavoriteSubscription =
      this.sharedService.allDoneFavoriteSubject.subscribe((data) => {
        this.allDone = data;
      });
  }

  ionViewWillEnter() {
    this.sharedService.allDoneFavoriteSubject.next(false);
    this.sharedService.loadFavoriteListSubject.next(
      this.favoriteService.favoriteList
    );
  }

  onRepeat() {
    this.sharedService.allDoneFavoriteSubject.next(false);
    this.sharedService.loadFavoriteListSubject.next([
      ...this.favoriteService.favoriteList,
    ]);
  }

  ngOnDestroy() {
    this.allDoneFavoriteSubscription.unsubscribe();
  }
}
