import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesPage } from './favorites.page';
import { MultipleChoiceFavoriteComponent } from '../../components/multiple-choice-favorite/multiple-choice-favorite.component';
import { ScratchCardComponent } from 'src/app/components/shared/scratch-card/scratch-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritesPageRoutingModule],
  declarations: [
    FavoritesPage,
    MultipleChoiceFavoriteComponent,
    ScratchCardComponent
  ],
})
export class FavoritesPageModule {}
