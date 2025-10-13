
//Imports for Cordova and native Ionic fuctions
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

//Page Imports for Navigation
// TODO: Install and import @capacitor/camera plugin
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadPhotoPage } from '../upload-photo/upload-photo';
import { HelpPage } from '../help/help';


@Component({
  selector: 'page-take-photo',
  templateUrl: 'take-photo.html'
})
export class TakePhotoPage {

  //Varible that holds the photo data.
  public base64Image: string;

  //
  constructor(public navCtrl: NavController,
  public modalCtrl: ModalController) {}

  //function to take the user back to the home page
  home(){

    //pops this page from the stack since this page is only used from the
    //home page. 
    this.navCtrl.pop();
  }

  //Fuction to let the user take a photo when the photo 
  //button is clicked
  async takePhoto(){
    // TODO: Implement with @capacitor/camera
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: false,
    //   resultType: CameraResultType.DataUrl,
    //   source: CameraSource.Camera,
    //   width: 1000,
    //   height: 1000
    // });
    // this.base64Image = image.dataUrl;
    // const modal = await this.modalCtrl.create({
    //   component: UploadPhotoPage,
    //   componentProps: { photo: this.base64Image }
    // });
    // return await modal.present();
    
    console.warn('Camera functionality not yet implemented - install @capacitor/camera');
    alert('Camera functionality requires @capacitor/camera plugin to be installed');
  }

  //lets the user pick a photo from there gallery or photo library
  async choosePhoto(){
   // TODO: Implement with @capacitor/camera
   // const image = await Camera.getPhoto({
   //   quality: 90,
   //   allowEditing: false,
   //   resultType: CameraResultType.DataUrl,
   //   source: CameraSource.Photos
   // });
   // this.base64Image = image.dataUrl;
   // const modal = await this.modalCtrl.create({
   //   component: UploadPhotoPage,
   //   componentProps: { photo: this.base64Image }
   // });
   // return await modal.present();
   
   console.warn('Photo library functionality not yet implemented - install @capacitor/camera');
   alert('Photo library functionality requires @capacitor/camera plugin to be installed');
  }

  //This function creates the help page 
  async help() {

    //creates the help page and presents it. 
    const helpModal = await this.modalCtrl.create({
      component: HelpPage
    });
    return await helpModal.present();
  }

}
