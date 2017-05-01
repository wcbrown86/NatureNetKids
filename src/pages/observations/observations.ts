//Default import from the creation of the page
import { Component } from '@angular/core';

//imports needed for navigation control
//Loading Controller ...
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

//Add comments here 
import { Subject } from "rxjs/Subject";
import { EventData } from '../../providers/event-data';

//Page imports needed for linked pages.
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

  //Funtion called in a photo is selected
  viewSelectedObservation(observation){
    //adds the created page for the photo selected to the stack
    //needed information is passed to the DetailObserbationPage
    this.navCtrl.push(DetailObservationPage, {observation: observation});
  }

  //Function that is called when the home button is selected.
  home(){

    //the page is popped since this page is only accessed from the home page
    this.navCtrl.pop();

  }

  //Page load log, not needed for the app to run, was left to help with errors
  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservationsPage');
  }

  //Help page is created when this function is called
  help() {

    //Creates and presents the help page. 
    let helpModal = this.modalCtrl.create(HelpPage);
    helpModal.present();
  }

}
