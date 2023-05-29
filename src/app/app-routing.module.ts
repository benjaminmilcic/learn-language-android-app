import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'categories',
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./tabs/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./tabs/favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./tabs/settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
    ],
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./tabs/favorites/favorites.module').then(
        (m) => m.FavoritesPageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./tabs/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },

  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./tabs/home/home.module').then((m) => m.HomePageModule),
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// @NgModule({
//   imports: [
//     RouterModule.forRoot([
//       {
//         path: '',
//         loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
//         children: [
//           {
//             path: '',
//             pathMatch: 'full',
//             redirectTo: 'home',
//           },
//           {
//             path: 'home',
//             loadChildren: () =>
//               import('./home/home-page.module').then((m) => m.HomePageModule),
//           },
//           {
//             path: 'radio',
//             loadChildren: () =>
//               import('./radio/radio-page.module').then(
//                 (m) => m.RadioPageModule
//               ),
//           },
//           {
//             path: 'library',
//             loadChildren: () =>
//               import('./library/library-page.module').then(
//                 (m) => m.LibraryPageModule
//               ),
//           },
//           {
//             path: 'search',
//             loadChildren: () =>
//               import('./search/search-page.module').then(
//                 (m) => m.SearchPageModule
//               ),
//           },
//         ],
//       },
//     ]),
//   ],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
