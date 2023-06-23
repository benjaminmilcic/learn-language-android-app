import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordlistsPageRoutingModule } from './wordlists-routing.module';

import { WordlistsPage } from './wordlists.page';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { CustomWordlistsComponent } from 'src/app/components/custom-wordlists/custom-wordlists.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordlistsPageRoutingModule
  ],
  declarations: [WordlistsPage, CategoriesComponent, CustomWordlistsComponent]
})
export class WordlistsPageModule {}
