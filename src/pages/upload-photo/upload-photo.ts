//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';

//Imports for page navigation adn the alert controller which is used for popups
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
//Import for media conrtols. 
import { MediaPlugin, MediaObject } from '@ionic-native/media';

//Page Imports for Navigation to connected pages
import { HomePage } from '../home/home';
import { RecordPagePage } from '../record-page/record-page';
import { HelpPage } from '../help/help';
//Firebase
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
//Cloudinary
import * as cloudinary from 'cloudinary';

//Global variables for ...
var text: any;
var testImage: any;

@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html'
})
export class UploadPhotoPage {

  //Variable to store passed photo. 
  public passedPhoto: string;
  //Varible for the default selected project 
  project: string = "NNK";

  //Firebase array
  //public photoDesc: FirebaseListObservable<any>;
  public fireRef: any;
  public obRef: any;
  public recordedFile: MediaObject

  //Injected variables for navgation and other functions
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    angFire: AngularFire) {
    
    //stores the passed photo from the camera roll or a photo taken to show on the screen
    this.passedPhoto = navParams.get('photo');

    //Firebase references
    //this.photoDesc = angFire.database.list('/items');
    this.fireRef = firebase.database().ref('/'); // Get a firebase reference to the root 
    this.obRef = firebase.database().ref('observations'); // Get a firebase reference to the todos

    //used for testing Cloudinary upload
    testImage = "https://image.flaticon.com/teams/new/1-freepik.jpg";
  }

  //function to take the user back to the home page
  home() {

    //creates the home page and presents it.
    let goHome = this.modalCtrl.create(HomePage);
    goHome.present();
  }

  //Function that persents the alert pop up that alows the user to record audio
  record() {
    
    //Creates the page and presents the page to the usr
    let recordInfo = this.modalCtrl.create(RecordPagePage);
    recordInfo.present();

    //looks for data passed back to the page from the page created
    //Makes a referance to the MediaObjet passed from the record page. 
    recordInfo.onDidDismiss(data=>this.recordedFile); 
  }

//Pop up window for image description entry
  addText():void{
    let prompt = this.alertCtrl.create({
      title: 'Picture Text',
      message: 'What is your picture about?',
      inputs:[{
        name: 'description',
        placeholder: 'type here'
      }],buttons:[{
        text: "Cancel",
        handler: data => {console.log("cancel clicked");}
      },
      {
        text: "Okay",
        handler: data => {this.setText(data.description)}}]//this.setText(data.description)
    });
    prompt.present();
  }

  //Function called when the submit button is pressed
  // TODO: add recorded audio to the upload 
  postPhoto(){

   cloudinary.uploader.upload(testImage, this.onComplete); //passedPhoto instead of testImage
   
   //This is needed to release the recorded file for memory issues. 
   this.recordedFile.release(); //deletes recorded file
  }

  setText(desc){
    text = desc;
    //Used for testing text
    //alert("setText = "+text);
  }

  onComplete(result){
    let myDate: String = new Date().toISOString();
    let imageURL=result.secure_url;
    let activity='NatureNetKids';
    let textA = text;
    let id='12345';
    let observer='qwerty';
    let site='kids app';
    
    let fireRef = firebase.database().ref('/'); // Get a firebase reference to the root 
    let obRef = firebase.database().ref('observations'); // Get a firebase reference to the todos
    if (imageURL!=null && text!=null){
    obRef.push({activity: activity,
                create_at: myDate,
                data: 
                  {image: imageURL,
                    text: textA},
                id: id,
                observer: observer,
                site: site,
                updated: myDate});
    }else{alert("Missing a field: text is "+textA+", imageURL is "+imageURL);}

  }

  //Function that is called when the help button is pressed
  help() {

    //Creates and presents the help page. 
    let helpModal = this.modalCtrl.create(HelpPage);
    helpModal.present();
  }

}
