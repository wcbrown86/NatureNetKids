import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';

import { TakePhotoPage } from '../take-photo/take-photo';

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
  

}
