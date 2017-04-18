import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';
import { HomePage } from '../home/home';
//Firebase import for uploading user sign id
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
  obRef: any;
  name: AbstractControl;
 
  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    private fb: FormBuilder, 
    private auth: AuthProvider,
    angFire: AngularFire)
  {
    this.signupForm = this.fb.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  
    this.email = this.signupForm.controls['email'];     
    this.password = this.signupForm.controls['password'];
    this.name = this.signupForm.controls['name'];  

    this.obRef = firebase.database().ref('users');
  }
 
  submitSignup(): void { 
    if(this.signupForm.valid) {
        var credentials = ({email: this.email.value, password: this.password.value});
        this.auth.registerUser(credentials).subscribe(registerData => {
            console.log("submitSignup user uid: ",registerData.uid);
            alert('User is registered and logged in.');
            this.navCtrl.setRoot(HomePage);
        }, registerError => {
          console.log(registerError);
          if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
          {
            alert(registerError.message);
          }
          this.error = registerError;
        });
    }
  }

  home(){

  let homeModal = this.modalCtrl.create(HomePage);
  homeModal.present();
  } 
}
