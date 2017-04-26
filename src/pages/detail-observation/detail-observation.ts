import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { HelpPage } from '../help/help';

/*
  Generated class for the DetailObservation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-observation',
  templateUrl: 'detail-observation.html'
})
export class DetailObservationPage {

  observation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.observation = navParams.get('observation');
  }

   home(){
    let goHome = this.modalCtrl.create(HomePage);
    goHome.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailObservationPage');
  }

  help() {
    let helpModal = this.modalCtrl.create(HelpPage);
    helpModal.present();
  }

}
