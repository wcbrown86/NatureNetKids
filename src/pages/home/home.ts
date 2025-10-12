// Default import from ionic page creation
import { Component } from '@angular/core';
// imports needed for page navigation.
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
// added AuthProvider for login and account verification. 
import { AuthProvider } from '../../providers/auth-provider'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage {

  // Constructor injects all the variables needed for app functionality. 
  constructor(
    public modalCtrl: ModalController,
    public router: Router,
    public auth: AuthProvider
  ) {}
  
  // Function that is called when the user clicks the add picture button
  async takePhotoPage() {
    // checks to see if a user is logged in before the user can add a photo
    if (this.auth.currentUser !== '') {
      // if the current user is not empty the user is sent to the take photos page
      this.router.navigate(['/take-photo']);
    } else {
      // if a user is not logged in the user is sent to the login page
      this.router.navigate(['/login']);
    }
  }

  // Function that is called to take the user to the view observations page
  seeProjects() {
    this.router.navigate(['/observations']);
  } 

  // The function that is called when the user needs to signup. 
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  // The function that is called when the user clicks the settings button
  settings() {
    this.router.navigate(['/settings']);
  }

  // The function that is called when the user selects the help button 
  help() {
    this.router.navigate(['/help']);
  }

}
