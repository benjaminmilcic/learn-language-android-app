import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/shared/favorite.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-sliding-list',
  templateUrl: './sliding-list.component.html',
  styleUrls: ['./sliding-list.component.css'],
})
export class SlidingListComponent implements OnInit {
  

  constructor(
    public favoriteService: FavoriteService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    
  }

  onRemoveFavorite(index: number) {
    this.favoriteService.removeFavorite(index);
    this.sharedService.loadFavoriteListSubject.next(
      this.favoriteService.favoriteList
    );
  }
}
