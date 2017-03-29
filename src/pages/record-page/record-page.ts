import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

/*
  Generated class for the RecordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record-page',
  templateUrl: 'record-page.html'
})
export class RecordPagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPagePage');
  }

  cancel(){
  	this.navCtrl.pop();
  }

}
