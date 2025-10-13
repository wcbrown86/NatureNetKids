import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { AddTextPage } from './add-text';

const routes: Routes = [
  {
    path: '',
    component: AddTextPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTextPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddTextPageModule {}

