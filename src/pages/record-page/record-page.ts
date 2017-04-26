
//Imports for ionic functions, and native plugins
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { MediaPlugin, MediaObject } from '@ionic-native/media';

//Page Navigation imports
import { HomePage } from '../home/home';
import { HelpPage } from '../help/help';

@Component({
  selector: 'page-record-page',
  templateUrl: 'record-page.html'
})
export class RecordPagePage {

  //stopRecord: boolean = false; 
  fileRecorded: MediaObject;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  	public viewCtrl: ViewController, 
    public alertCtrl: AlertController,
    private media: MediaPlugin,
    public modalCtrl: ModalController) {}

  //alert function to pass error messages to the user as needed. 
  showAlert(message){

    //create alert with message passed from function call
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    })

    //Shows the alert
    alert.present();
  }

  //Takes the use back to the home Page
  home() {
    this.navCtrl.popAll();
  }

  //Start record function, 
  recordAudio(){

    this.media.create('record.wav')
      .then((file: MediaObject) => {

        file.startRecord();
        this.fileRecorded = file;
      });

  }

  stopRecord(){
    this.fileRecorded.stopRecord();
  }

  playAudio(){ 
    this.fileRecorded.play()
  }

  stopAudio(){
    this.fileRecorded.stop(); 
  }

  //Cancel button sends the user back to the upload photo page.
  cancel(){
    this.fileRecorded.release(); //Delets Recorded File
    this.navCtrl.pop();

  }

  save(){
    this.viewCtrl.dismiss(this.fileRecorded);
  }

  help() {
    let helpModal = this.modalCtrl.create(HelpPage);
    helpModal.present();
  }

}
