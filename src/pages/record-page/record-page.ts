
//Imports for ionic functions, and native plugins
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MediaPlugin, MediaObject } from '@ionic-native/media';

//Page Navigation imports
import { HomePage } from '../home/home';

@Component({
  selector: 'page-record-page',
  templateUrl: 'record-page.html'
})
export class RecordPagePage {



  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public modalCtrl: ModalController, public alertCtrl: AlertController,
    private media: MediaPlugin) {}

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
    let goHome = this.modalCtrl.create(HomePage);
    goHome.present();
  }

  //Start record function, 
  recordAudio(){

    this.media.create('record.wav')
      .then((file: MediaObject) => {

        file.startRecord();

        setTimeout(function() {

          file.stopRecord();
          
        }, 30000);

        

      });

  }

  playAudio(){ 

    this.media.create('record.wav')
      .then((file: MediaObject) => {

        file.play();

      });
    

  }

  //Cancel button sends the user back to the upload photo page.
  cancel(){
  	this.navCtrl.pop();
  }

  save(){

  }

}
