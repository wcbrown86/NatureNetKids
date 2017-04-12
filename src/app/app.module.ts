import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Angularfire module imports
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
import { SignupPage } from '../pages/signup/signup';
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
    /*apiKey: "AIzaSyChM0Tmrj_K_SJd4IqQBlOfzDC61xMFguU",
    authDomain: "naturenet-testing.firebaseapp.com",
    databaseURL: "https://naturenet-testing.firebaseio.com",
    storageBucket: "naturenet-testing.appspot.com",
    messagingSenderId: "37913246342"*/
    apiKey: "AIzaSyDMMSsdcktRuz9SE7RFteTnM_rjCkX08-c",
    authDomain: "experiment-ad575.firebaseapp.com",
    databaseURL: "https://experiment-ad575.firebaseio.com",
    projectId: "experiment-ad575",
    storageBucket: "experiment-ad575.appspot.com",
    messagingSenderId: "835520618061"
};

//EXAMPLE config code
export const cloudinaryConfig =({ 
  cloud_name: 'dpcpagxba', 
  api_key: '812163379489478', 
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
    SignupPage
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
    SignupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider, MediaPlugin]
})
export class AppModule {}
