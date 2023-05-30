import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import { FavoriteService } from '../shared/favorite.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  constructor(
    public databaseService: DatabaseService,
    private favoriteService: FavoriteService
  ) {}
  async ngOnInit() {
    await this.databaseService.fetchData();
    if (localStorage.getItem('favoriteList')) {
      this.favoriteService.favoriteList = JSON.parse(
        localStorage.getItem('favoriteList')
      );
    }
  }
}
