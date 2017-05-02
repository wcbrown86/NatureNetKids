//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';

//Imports for page navigation adn the alert controller which is used for popups
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
//Import for media conrtols. 
import { MediaPlugin, MediaObject } from '@ionic-native/media';

//User Authentication for retrieving use name
import { AuthProvider } from '../../providers/auth-provider'; 

//Page Imports for Navigation to connected pages
import { HomePage } from '../home/home';
import { RecordPagePage } from '../record-page/record-page';
import { HelpPage } from '../help/help';
import { AddTextPage } from '../add-text/add-text';
//Firebase
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
//Cloudinary
import * as cloudinary from 'cloudinary';

//Global variables for observation text upload, user name, project name
var uploadText: string;
var user: any;
var project: string = 'NNK';

@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html'
})
export class UploadPhotoPage {

  //Variable to store passed photo. 
  public passedPhoto: string;
  //Varible for the default selected project 
  //project: string = "NNK";
  public text: string;
  public testImage: any;

  //Firebase array
  public obRef: any;
  public recordedFile: MediaObject;

  //Injected variables for navgation and other functions
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    angFire: AngularFire,
    public auth: AuthProvider) {
    
    //stores the passed photo from the camera roll or a photo taken to show on the screen
    this.passedPhoto = navParams.get('photo');

    //Firebase references
    //this.photoDesc = angFire.database.list('/items');
     //Gets the login name of the currrent user
    user = this.auth.currentUser;

    //used for testing Cloudinary upload
    this.testImage = "https://image.flaticon.com/teams/new/1-freepik.jpg";

    //Set text from changing color of add text button
    this.text = navParams.get('text');
    //Set text for upload
    uploadText = navParams.get('text'); 
  }

  //function to take the user back to the home page
  home() {

    //seets the home page to the rootPage for presentation.
    this.navCtrl.setRoot(HomePage);
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
    //Goes to the new addTextPage for user to add text
    this.navCtrl.setRoot(AddTextPage);

    /*let prompt = this.alertCtrl.create({
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
    prompt.present();*/
  }

  //Function called when the submit button is pressed
  // TODO: add recorded audio to the upload 
  postPhoto(){

   cloudinary.uploader.upload(this.testImage, this.onComplete); //passedPhoto instead of testImage
   
   //This is needed to release the recorded file for memory issues. 
   //this.recordedFile.release(); //deletes recorded file
  }

  onComplete(result){
    let myDate: String = new Date().toISOString();
    let imageURL=result.secure_url;
    let activity= project;
    let _text = uploadText;
    let id='TestID';
    let observer= user;
    let site='kids app';
    
     let errorList: Array<string>=[];

    if(_text==null){errorList.push('You must provide a description of your picture.')};

    let obRef = firebase.database().ref('observations'); // Get a firebase reference to the observations

    if (imageURL!=null && _text!=null){
      obRef.push({activity: activity,
                  create_at: myDate,
                  data: 
                    {image: imageURL,
                      text: _text},
                  id: id,
                  observer: observer,
                  site: site,
                  updated: myDate});
      //Alerts the user the upload was success
      //Displays whether upload was successful or not
      alert("Your observation has been uploaded successfully!");
    }else{alert(errorList);}

  }

  //Function that is called when the help button is pressed
  help() {

    //Creates and presents the help page. 
    let helpModal = this.modalCtrl.create(HelpPage);
    helpModal.present();
  }

}
