
//Imports for ionic functions, and native plugins
import { Component } from '@angular/core';
//Imports for page navigation and the alert popup.
import { NavController, AlertController, ModalController } from '@ionic/angular';
// TODO: Install and configure @capacitor/media or equivalent plugin
// import { MediaPlugin, MediaObject } from '@ionic-native/media';

//Page Navigation imports
import { HomePage } from '../home/home';
import { HelpPage } from '../help/help';

@Component({
  selector: 'page-record-page',
  templateUrl: 'record-page.html'
})
export class RecordPagePage {

  //Global variable used to make recording controls simple.
  fileRecorded: any; // MediaObject
  
  //Injected variables needed for functionality
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    // private media: MediaPlugin,
    public modalCtrl: ModalController) {}

  /*alert function to pass error messages to the user as needed. 
    TODO: Add error handling with this function, it is not 
    currently being used. */
  async showAlert(message){

    //create alert with message passed from function call
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    //Shows the alert
    await alert.present();
  }

  //Takes the use back to the home Page
  async home() {

    //Creates the home page and presents the page. 
    const home = await this.modalCtrl.create({
      component: HomePage
    });
    await home.present();
  }

  //Start record function, this creates the file in the temp folder
  recordAudio(){
   // TODO: Implement with Capacitor media plugin
   console.warn('Media recording not yet implemented');
   alert('Audio recording requires media plugin to be installed and configured');
  }

  //Stop Recording fucntion
  stopRecord(){

    //uses built in stop record function 
    this.fileRecorded.stopRecord();
  }

  //Play audio fucntion
  playAudio(){ 

    //uses built in play function.
    this.fileRecorded.play()
  }

  //Stop playback button 
  stopAudio(){

    //uses built in stop function to stop playback
    this.fileRecorded.stop(); 
  }

  //Cancel button sends the user back to the upload photo page.
  cancel(){

    if(this.fileRecorded != null){
      this.fileRecorded.release(); //Deletes Recorded File
    }
    this.navCtrl.pop(); //Removes this page from the stack
    //taking the user back to the Upload page.

  }

  //Save fucntion. 
  save(){

    //This pops the page off the stack and passes the MediaObject 
    //Back to the upload page
    this.modalCtrl.dismiss(this.fileRecorded);
  }

  //Help page fucntion to take the user to the help Page
  async help() {

    //this creates the help page and presetens the page. 
    const helpModal = await this.modalCtrl.create({
      component: HelpPage
    });
    await helpModal.present();
  }

}
