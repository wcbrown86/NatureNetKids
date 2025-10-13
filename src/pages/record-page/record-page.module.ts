import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { RecordPagePage } from './record-page';

const routes: Routes = [
  {
    path: '',
    component: RecordPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecordPagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecordPagePageModule {}

