import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWordlistsPage } from './edit-wordlists.page';

const routes: Routes = [
  {
    path: '',
    component: EditWordlistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWordlistsPageRoutingModule {}
