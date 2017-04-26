import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Subject } from "rxjs/Subject";

import { EventData } from '../../providers/event-data';
import { HomePage } from '../home/home';
import { DetailObservationPage } from '../detail-observation/detail-observation';
import { HelpPage } from '../help/help';

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

 public b: number=0;
 public observationsList: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private angFire: AngularFire,
    private loadingCtrl: LoadingController,
    public eventData: EventData) {
//This function loads five observations at a time from firebase
    this.loadMoreObservations();

  }

      loadMoreObservations(){
        this.b+=5
         this.eventData.getLimitedCategoryList(this.b).on('value', snapshot => {
          let rawList1 = [];
          snapshot.forEach(snap => {
            //console.log("SNAP!! ",this.eventData.getUserFromFirebase(snap.val().observer));
            rawList1.unshift({
              text: snap.val().data.text,
              image_url: snap.val().data.image,
            });
          });
          this.observationsList = rawList1;
        });

      }


  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {
       /*this.b+=5
         this.eventData.getlimitedcategoryList(this.b).on('value', snapshot => {
          let rawList1 = [];
          snapshot.forEach(snap => {
            // console.log("SNAP!! ",snap.val().data.text);
            rawList1.unshift({
              text: snap.val().data.text,
              image_url: snap.val().data.image
            });
          });
          this.observationsList = rawList1;*/
          this.loadMoreObservations();
        //});

      //console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 300);
  }

  viewSelectedObservation(observation){
    this.navCtrl.push(DetailObservationPage, {observation: observation});
  }

  home(){
    this.navCtrl.pop();
    //let goHome = this.modalCtrl.create(HomePage);
    //goHome.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationsPage');
  }

  help() {
    let helpModal = this.modalCtrl.create(HelpPage);
    helpModal.present();
  }

}
