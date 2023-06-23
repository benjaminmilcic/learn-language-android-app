import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { OptionsComponent } from '../../components/options/options.component';
import { PracticeComponent } from '../../components/practice/practice.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    OptionsComponent,
    PracticeComponent
  ],
})
export class HomePageModule {}
