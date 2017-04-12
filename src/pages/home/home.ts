import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
//Pages
import { TakePhotoPage } from '../take-photo/take-photo';
import { ObservationsPage } from '../observations/observations';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;  //Added login page for logging out
 
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController) {}
  
    takePhotoPage(){

      let photoModal = this.modalCtrl.create(TakePhotoPage);
      photoModal.present();

    }

    seeProjects(){

      let observationsModal = this.modalCtrl.create(ObservationsPage);
      observationsModal.present();

    } 

    goToLogin(){

      let loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present();
    }

    goToSignup(){

      let signupModal = this.modalCtrl.create(SignupPage);
      signupModal.present();
    }

}
