import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
//added AuthProvider
import { AuthProvider } from '../../providers/auth-provider';
import { LoginPage } from '../login/login';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public auth: AuthProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goToLogin() {

    let loginModal = this.modalCtrl.create(LoginPage);
    loginModal.present();
  }

  close() {
    this.navCtrl.pop();
  }

  logout(): void {

    this.auth.logout();
  }

}
