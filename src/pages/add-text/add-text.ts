import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
//Form
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
//Pages
import { HomePage } from '../home/home';
import { UploadPhotoPage } from '../upload-photo/upload-photo';
import { HelpPage } from '../help/help';


@Component({
  selector: 'page-add-text',
  templateUrl: 'add-text.html'
})
export class AddTextPage {

  //global variables to store information 
  textForm: FormGroup;
  userText: string;
  error: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
  	private forumBld: FormBuilder) {}

    addText(){
        if(this.userText!=null) {
          this.navCtrl.push(UploadPhotoPage, {text: this.userText});
        }else{
          alert("Must type in something to continue to add the observation or touch the cancel button to go back");
        }
    }

    cancelText(){
      this.navCtrl.setRoot(UploadPhotoPage);
    }

    home() {

      this.navCtrl.setRoot(HomePage);
    }
    
    help() {
      let helpModal = this.modalCtrl.create(HelpPage);
      helpModal.present();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AddTextPage');
    }

}

