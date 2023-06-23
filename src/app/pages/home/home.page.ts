import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  wordlistMode: 'categories' | 'custom' = 'categories';

  constructor(public categoryService: CategoryService, private modalController: ModalController, private router:Router) { }

  async onSelectWordlist() {
    // this.router.navigate(['../wordlists']);

    // const modal = await this.modalController.create({
    //   component: SelectWordlistsComponent,
    // });
    // modal.present();
  }
}
