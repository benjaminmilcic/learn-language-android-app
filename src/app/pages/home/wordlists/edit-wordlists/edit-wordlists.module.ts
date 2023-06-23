import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWordlistsPageRoutingModule } from './edit-wordlists-routing.module';

import { EditWordlistsPage } from './edit-wordlists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditWordlistsPageRoutingModule
  ],
  declarations: [EditWordlistsPage]
})
export class EditWordlistsPageModule {}
