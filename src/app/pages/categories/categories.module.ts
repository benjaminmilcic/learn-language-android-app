import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';

import { CategoriesPageRoutingModule } from './categories-routing.module';
import { OptionsComponent } from '../../components/options/options.component';
import { MultipleChoiceCategoriesComponent } from 'src/app/components/multiple-choice-categories/multiple-choice-categories.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
  ],
  declarations: [
    CategoriesPage,
    OptionsComponent,
    MultipleChoiceCategoriesComponent,
  ],
})
export class CategoriesPageModule {}
