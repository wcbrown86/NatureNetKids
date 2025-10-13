//Imports for Cordova and native Ionic fuctions
import { Component, Input, OnInit } from '@angular/core';

//Imports for page navigation adn the alert controller which is used for popups
import { NavController, ModalController, AlertController } from '@ionic/angular';
//Import for media controls. 
// TODO: Install and configure @capacitor/media or equivalent plugin
// import { MediaObject } from '@ionic-native/media';

//User Authentication for retrieving use name
import { AuthProvider } from '../../providers/auth-provider'; 

//Page Imports for Navigation to connected pages
import { RecordPagePage } from '../record-page/record-page';
import { HelpPage } from '../help/help';
import { AddTextPage } from '../add-text/add-text';
//Firebase
import { getDatabase, ref as dbRef, push as dbPush } from 'firebase/database';

//Global variables for observation text upload, user name, project name
var uploadText: string;
var user: any;
var project: string = 'NNK';

@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html'
})
export class UploadPhotoPage implements OnInit {

  //Variable to store passed photo. 
  @Input() photo: any;
  public passedPhoto: any;
  //Varible for the default selected project 
  public project: string = "NNK";
  public text: string;
  public testImage: any;

  //Firebase array
  public obRef: any;
  public recordedFile: any; // MediaObject

  //Injected variables for navgation and other functions
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public auth: AuthProvider) {
  }

  ngOnInit() {
    //stores the passed photo from the camera roll or a photo taken to show on the screen
    this.passedPhoto = this.photo;

     //Gets the login name of the currrent user
    user = this.auth.currentUser;
    uploadText = "";

  }

  //function to take the user back to the home page
  home() {

    //pops the pages off takes the user back to the home page
    this.navCtrl.navigateRoot('/home');
  }

  //Function that persents the alert pop up that alows the user to record audio
  async record() {
    
    //Creates the page and presents the page to the usr
    const recordInfo = await this.modalCtrl.create({
      component: RecordPagePage
    });
    
    //looks for data passed back to the page from the page created
    //Makes a referance to the MediaObjet passed from the record page. 
    recordInfo.onDidDismiss().then((result) => {
      this.recordedFile = result.data; 
    });
    await recordInfo.present();
     
  }

//Pop up window for image description entry
  async addText(): Promise<void>{

    //Goes to the new addTextPage for user to add text
    const addText = await this.modalCtrl.create({
      component: AddTextPage
    });
    
    addText.onDidDismiss().then((result) => {
        if (result.data) {
          this.text = result.data.userEntered;
          uploadText = this.text;
        }
      });
    
    await addText.present();

  }

  //Function called when the submit button is pressed
  // TODO: add recorded audio to the upload 
  // TODO: Re-implement Cloudinary upload or use Firebase Storage
  postPhoto(){

   // Cloudinary functionality temporarily disabled - needs proper setup
   console.warn('Photo upload functionality requires Cloudinary configuration');
   alert('Photo upload functionality is currently disabled. Please configure Cloudinary.');
   
   //This is needed to release the recorded file for memory issues. 

   if(this.recordedFile != null){
    this.recordedFile.release(); //deletes recorded file
   }

   this.navCtrl.navigateRoot('/home');

  }

  //Function that is called when the help button is pressed
  async help() {

    //Creates and presents the help page. 
    const helpModal = await this.modalCtrl.create({
      component: HelpPage
    });
    await helpModal.present();
  }

}
