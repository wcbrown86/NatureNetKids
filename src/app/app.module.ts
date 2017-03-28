import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TakePhotoPage } from '../pages/take-photo/take-photo';
import { UploadPhotoPage } from '../pages/upload-photo/upload-photo';
import { RecordPagePage } from '../pages/record-page/record-page';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'aafebad1'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TakePhotoPage,
    UploadPhotoPage,
    RecordPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TakePhotoPage,
    UploadPhotoPage,
    RecordPagePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}