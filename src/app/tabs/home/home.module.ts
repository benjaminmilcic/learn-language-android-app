import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { OptionsComponent } from './options/options.component';
import { PracticeComponent } from './practice/practice.component';
import { SlidingListComponent } from './sliding-list/sliding-list.component';
import { MultipleChoiceFavoriteComponent } from './multiple-choice-favorite/multiple-choice-favorite.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
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
export class HomePageModule {}
