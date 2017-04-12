import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
//Angulrfire imports
import { AngularFire, FirebaseListObservable } from 'angularfire2';
//May not be needed. Wait to remove!
//import * as firebase from 'firebase';

//Cloudinary
import { CloudinaryModule } from '@cloudinary/angular';
import * as cloudinary from 'cloudinary';



/*
  Generated class for the Observations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-observations',
  templateUrl: 'observations.html'
})
export class ObservationsPage {

//The arraylist to hold all the activities in the test database
//private observations: FirebaseListObservable<any[]>;
private activities: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public modalCtrl: ModalController,
  private angFire: AngularFire,
  private loadingCtrl: LoadingController) {

    //Goes to the firebase naturenet-testing database, gets all the activity entires
    //and puts them into the observations arraylist
  	//this.observations = this.angFire.database.list('/observations');
    //this.activities = this.angFire.database.list('/activities');
    this.activities = this.angFire.database.list('/items');
   
  }

  home(){
    this.navCtrl.pop();
    //let goHome = this.modalCtrl.create(HomePage);
    //goHome.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationsPage');
  }

}
