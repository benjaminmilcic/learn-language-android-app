import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../shared/database.service';
import { SharedService } from '../../shared/shared.service';
import { FavoriteService } from '../../shared/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  practiceMode: 'default' | 'custom';

  constructor(
    public databaseService: DatabaseService,
    public sharedService: SharedService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.databaseService.fetchData();
    if (localStorage.getItem('favoriteList')) {
      this.favoriteService.favoriteList = JSON.parse(
        localStorage.getItem('favoriteList')
      );
    }
  }
}
