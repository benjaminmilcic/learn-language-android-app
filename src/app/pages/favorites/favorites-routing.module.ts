import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesPage } from './favorites.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPage
  },
  {
    path: 'favorites-list',
    loadChildren: () => import('./favorites-list/favorites-list.module').then( m => m.FavoritesListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesPageRoutingModule {}
