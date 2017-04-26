import { Component } from '@angular/core';
import { NavController , ModalController, NavParams} from 'ionic-angular';
//Pages
import { TakePhotoPage } from '../take-photo/take-photo';
import { ObservationsPage } from '../observations/observations';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';
//added AuthProvider
import { AuthProvider } from '../../providers/auth-provider'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public navPrm: NavParams, 
    public auth: AuthProvider) {}
  
    takePhotoPage(){
      if(this.auth.currentUser!=''){
        let photoModal = this.modalCtrl.create(TakePhotoPage);
        photoModal.present();
      }else{
        let loginModal = this.modalCtrl.create(LoginPage);
        loginModal.present();
      }

    }

    seeProjects(){

      let observationsModal = this.modalCtrl.create(ObservationsPage);
      observationsModal.present();

    } 

    goToSignup(){

      let signupModal = this.modalCtrl.create(SignupPage);
      signupModal.present();
    }

    settings(){
      let settingsModal = this.modalCtrl.create(SettingsPage);
      settingsModal.present()
    }

    help(){
      let helpModal = this.modalCtrl.create(HelpPage);
      helpModal.present();
    }

}
