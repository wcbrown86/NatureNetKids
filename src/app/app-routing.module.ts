import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'observations',
    loadChildren: () => import('../pages/observations/observations.module').then(m => m.ObservationsPageModule)
  },
  {
    path: 'detail-observation',
    loadChildren: () => import('../pages/detail-observation/detail-observation.module').then(m => m.DetailObservationPageModule)
  },
  {
    path: 'take-photo',
    loadChildren: () => import('../pages/take-photo/take-photo.module').then(m => m.TakePhotoPageModule)
  },
  {
    path: 'upload-photo',
    loadChildren: () => import('../pages/upload-photo/upload-photo.module').then(m => m.UploadPhotoPageModule)
  },
  {
    path: 'record-page',
    loadChildren: () => import('../pages/record-page/record-page.module').then(m => m.RecordPagePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('../pages/help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'add-text',
    loadChildren: () => import('../pages/add-text/add-text.module').then(m => m.AddTextPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

