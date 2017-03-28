import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
//Pages
import { TakePhotoPage } from '../take-photo/take-photo';
import { ObservationsPage } from '../observations/observations';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
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

}
