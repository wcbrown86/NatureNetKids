//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';


//Page Imports for Navigation
import { HomePage } from '../home/home';
import { RecordPagePage } from '../record-page/record-page';
//Firebase
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import * as cloudinary from 'cloudinary';


@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html'
})
export class UploadPhotoPage {

  //Variable to store passed photo. 
  public passedPhoto: string; 
  project: string = "NNK";

  //Firebase array
  //public photoDesc: FirebaseListObservable<any>;
  public fireRef: any;
  public obRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    angFire: AngularFire) {
    
    //stores the passed photo from the camera roll or a photo taken to show on the screen
    this.passedPhoto = navParams.get('photo');

    //Firebase references
    //this.photoDesc = angFire.database.list('/items');
    this.fireRef = firebase.database().ref('/'); // Get a firebase reference to the root 
    this.obRef = firebase.database().ref('items'); // Get a firebase reference to the todos

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

//Pop up window for image description entry
  addText():void{
    let prompt = this.alertCtrl.create({
      title: 'Picture Description',
      message: 'Enter picture description',
      inputs: [
        {
          name: 'description',
          placeholder: 'Description of Picture'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        { //Push description when Post button is clicked
          //This Okay button should add the description to an array to be pushed later
          text: "Okay",
          handler: data =>{
            this.obRef.push({
              name: data.description
            })
          }
        }
      ]

    });

    prompt.present();

    //let recordInfo = this.modalCtrl.create(AddTextPage);
    //recordInfo.present();
    //alert("Upload Text Successful!!!");

  }

}
