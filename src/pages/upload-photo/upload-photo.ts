//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

//Page Imports for Navigation
import { HomePage } from '../home/home';
import { RecordPagePage } from '../record-page/record-page';

@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html'
})
export class UploadPhotoPage {

  //Variable to store passed photo. 
  public passedPhoto: string; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
    
    //stores the passed photo from the camera roll or a photo taken to show on the screen
    this.passedPhoto = navParams.get('photo');

  }

  //function to take the user back to the home page
  home() {
    let goHome = this.modalCtrl.create(HomePage);
    goHome.present();
  }

  //Function that persents the alret pop up that alows the user to record audio
  record() {
    
    let recordInfo = this.modalCtrl.create(RecordPagePage);
    recordInfo.present();

  }
}
