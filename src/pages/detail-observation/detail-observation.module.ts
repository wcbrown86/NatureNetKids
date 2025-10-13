import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { DetailObservationPage } from './detail-observation';

const routes: Routes = [
  {
    path: '',
    component: DetailObservationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailObservationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailObservationPageModule {}

