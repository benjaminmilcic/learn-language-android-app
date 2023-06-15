import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { OptionsComponent } from '../../components/options/options.component';
import { PracticeComponent } from '../../components/practice/practice.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { CustomWordlistsComponent } from 'src/app/components/custom-wordlists/custom-wordlists.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    CategoriesComponent,
    CustomWordlistsComponent,
    OptionsComponent,
    PracticeComponent,
    ToolbarComponent
  ],
})
export class HomePageModule {}
