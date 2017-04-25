import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Angularfire module imports
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { AngularFireModule } from 'angularfire2';
//Added AuthProvider
import { AuthProvider} from '../providers/auth-provider';
import { EventData } from '../providers/event-data';
//Pages
import { HomePage } from '../pages/home/home';
import { TakePhotoPage } from '../pages/take-photo/take-photo';
import { UploadPhotoPage } from '../pages/upload-photo/upload-photo';
import { ObservationsPage } from '../pages/observations/observations';
import { LoginPage } from '../pages/login/login';
import { RecordPagePage } from '../pages/record-page/record-page';
import { SignupPage } from '../pages/signup/signup';
import { DetailObservationPage } from '../pages/detail-observation/detail-observation';
//Cloudinary
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular';
import * as cloudinary from 'cloudinary';
//Media plugin
import { MediaPlugin, MediaObject } from '@ionic-native/media';

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

//EXAMPLE config code
export const cloudinaryConfig =({ 
  cloud_name: 'dpcpagxba', //university-of-colorado
  api_key: '812163379489478', //android-present for unsigned_1
  api_secret: 'svR_diqK8MhNrSP_2WuMY9-gS4E' 

});

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TakePhotoPage,
    UploadPhotoPage,
    ObservationsPage,
    LoginPage,
    RecordPagePage,
    SignupPage,
    DetailObservationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
     //Initailizing the firebase using theconst variable above
    AngularFireModule.initializeApp(firebaseConfig),
    CloudinaryModule.forRoot({cloudinary}, { cloud_name: 'dpcpagxba' } as CloudinaryConfiguration)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TakePhotoPage,
    UploadPhotoPage,
    ObservationsPage,
    LoginPage,
    RecordPagePage,
    SignupPage,
    DetailObservationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider, EventData, MediaPlugin]
})
export class AppModule {}
