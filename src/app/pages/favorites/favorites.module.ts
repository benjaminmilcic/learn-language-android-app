import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesPage } from './favorites.page';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { SlidingListComponent } from '../../components/sliding-list/sliding-list.component';
import { MultipleChoiceFavoriteComponent } from '../../components/multiple-choice-favorite/multiple-choice-favorite.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritesPageRoutingModule],
  declarations: [
    FavoritesPage,
    MultipleChoiceFavoriteComponent,
    SlidingListComponent,
  ],
})
export class FavoritesPageModule {}
