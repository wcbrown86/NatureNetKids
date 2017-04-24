import { Component } from '@angular/core';
import { NavController , ModalController, NavParams} from 'ionic-angular';
//Pages
import { TakePhotoPage } from '../take-photo/take-photo';
import { ObservationsPage } from '../observations/observations';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
//added AuthProvider
import { AuthProvider } from '../../providers/auth-provider'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;  //Added login page for logging out
 
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

    goToLogin(){

      let loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present();
    }

    goToSignup(){

      let signupModal = this.modalCtrl.create(SignupPage);
      signupModal.present();
    }

     logout(): void {

        this.auth.logout();
    }

}
