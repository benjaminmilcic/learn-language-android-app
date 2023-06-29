import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordlistsPage } from './wordlists.page';

const routes: Routes = [
  {
    path: '',
    component: WordlistsPage
  },
  {
    path: 'edit-wordlists',
    loadChildren: () => import('./edit-wordlists/edit-wordlists.module').then( m => m.EditWordlistsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordlistsPageRoutingModule {}
