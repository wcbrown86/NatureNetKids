import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
//Form
import { FormGroup, FormBuilder } from '@angular/forms';
//Pages
import { HomePage } from '../home/home';
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
    public modalCtrl: ModalController,
  	private forumBld: FormBuilder) {}

    addText(){
        if(this.userText!=null) {
          let data = {
            userEntered: this.userText
          }
          this.modalCtrl.dismiss(data); 
        }else{
          alert("Must type in something to continue to add the observation or touch the cancel button to go back");
        }
    }

    cancelText(){
      this.modalCtrl.dismiss();
    }

    home() {

      this.navCtrl.navigateRoot('/home');
    }
    
    async help() {
      const helpModal = await this.modalCtrl.create({
        component: HelpPage
      });
      await helpModal.present();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad AddTextPage');
    }

}

