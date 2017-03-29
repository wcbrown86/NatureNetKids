
//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

//Page Imports for Navigation
import { Camera } from 'ionic-native';
import { HomePage } from '../home/home';
import { UploadPhotoPage } from '../upload-photo/upload-photo';


@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {

  //Varible that holds the photo data.
  public base64Image: string;

  //
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public modalCtrl: ModalController) {}

  //function to take the user back to the home page
  home(){
    let goHome = this.modalCtrl.create(HomePage);
    goHome.present();
  }

  //Fuction to let the user take a photo when the photo 
  //button is clicked
  takePhoto(){
    //Camera function that uses the device camra to take a photo 
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //stores the photo in a varable to pass the information to the 
      //next page.
      let photoInfo = this.base64Image;
      //creates the next page and loads the page
      let uploadPhoto = this.modalCtrl.create(UploadPhotoPage, {photo: photoInfo});
      uploadPhoto.present();
    }, (err) => {
      console.log(err);
    });

  }

  //lets the user pick a photo from there gallery or photo
  //library.
  choosePhoto(){
   //Camera function that pulls a photo from the device library.  
   
   Camera.getPicture({
     //photo options
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      //stores the photo into the base64Image varable 
      this.base64Image = 'data:image/jpeg;base64,'+ imageData;
      //stores the photo in a varable to pass the information to the 
      //next page.
      let photoInfo = this.base64Image;
      //creates the next page and loads the page
      let uploadPhoto = this.modalCtrl.create(UploadPhotoPage, {photo: photoInfo});
      uploadPhoto.present();
     }, (err) => {
      console.log(err);
    });


  }

}
