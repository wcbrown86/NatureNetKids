import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Firebase and Cloudinary dependent imports
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { AngularFireModule } from 'angularfire2';
//Added AuthProvider
import { AuthProvider} from '../providers/auth-provider';
//Pages
import { HomePage } from '../pages/home/home';
import { TakePhotoPage } from '../pages/take-photo/take-photo';
import { UploadPhotoPage } from '../pages/upload-photo/upload-photo';
import { ObservationsPage } from '../pages/observations/observations';
import { LoginPage } from '../pages/login/login';
import { RecordPagePage } from '../pages/record-page/record-page';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'aafebad1'
  }
};

export const firebaseConfig ={
    //apiKey info for the testing database
    apiKey: "AIzaSyChM0Tmrj_K_SJd4IqQBlOfzDC61xMFguU",
    authDomain: "naturenet-testing.firebaseapp.com",
    databaseURL: "https://naturenet-testing.firebaseio.com",
    storageBucket: "naturenet-testing.appspot.com",
    messagingSenderId: "37913246342"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TakePhotoPage,
    UploadPhotoPage,
    ObservationsPage,
    LoginPage,
    RecordPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
     //Initailizing the firebase using theconst variable above
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TakePhotoPage,
    UploadPhotoPage,
    ObservationsPage,
    LoginPage,
    RecordPagePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider]
})
export class AppModule {}
