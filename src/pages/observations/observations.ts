import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';

import { EventData } from '../../providers/event-data';
import { HomePage } from '../home/home';
import { DetailObservationPage } from '../detail-observation/detail-observation';
import { HelpPage } from '../help/help';


@Component({
  selector: 'page-observations',
  templateUrl: 'observations.html'
})
export class ObservationsPage {

 public b: number=0;
 public observationsList: any[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public eventData: EventData) {
      
    //This function loads five observations at a time from firebase
    this.loadMoreObservations();

  }

      loadMoreObservations(){
        this.b+=3
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
      this.loadMoreObservations();
      //console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 200);
  }

  viewSelectedObservation(observation){
    this.navCtrl.navigateForward('/detail-observation', {
      state: { observation: observation }
    });
  }

  home(){
    this.navCtrl.navigateRoot('/home');

  }

  async help() {
    const helpModal = await this.modalCtrl.create({
      component: HelpPage
    });
    await helpModal.present();
  }

}
