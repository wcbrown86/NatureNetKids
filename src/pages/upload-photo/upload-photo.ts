//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

//Page Imports for Navigation
import { HomePage } from '../home/home';

@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html'
})
export class UploadPhotoPage {

  public passedPhoto: string; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.passedPhoto = navParams.get('photo');

  }

  //function to take the user back to the home page
  home() {
    let goHome = this.modalCtrl.create(HomePage);
    goHome.present();
  }

  record() {

  }
}
