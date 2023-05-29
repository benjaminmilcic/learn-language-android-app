import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesPage } from './favorites.page';
import { CategoriesComponent } from '../home/categories/categories.component';
import { SlidingListComponent } from '../home/sliding-list/sliding-list.component';
import { MultipleChoiceFavoriteComponent } from '../home/multiple-choice-favorite/multiple-choice-favorite.component';
import { PracticeComponent } from '../home/practice/practice.component';
import { OptionsComponent } from '../home/options/options.component';
import { LoadingSpinnerComponent } from '../home/loading-spinner/loading-spinner.component';
import { ToolbarComponent } from '../home/toolbar/toolbar.component';
import { MenuComponent } from '../home/menu/menu.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritesPageRoutingModule],
  declarations: [
    FavoritesPage,
    CategoriesComponent,
    MenuComponent,
    ToolbarComponent,
    LoadingSpinnerComponent,
    OptionsComponent,
    PracticeComponent,
    MultipleChoiceFavoriteComponent,
    SlidingListComponent,
  ],
})
export class FavoritesPageModule {}
