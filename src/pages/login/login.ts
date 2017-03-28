import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//added AuthProvider
import { AuthProvider } from '../../providers/auth-provider'; 
//Angular form builder
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
//Pages
import { HomePage } from '../home/home';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;

  constructor(public navCtrl: NavController, 
  	public modalCtrl: ModalController,
  	private forumBld: FormBuilder,
  	public auth: AuthProvider) {

  	 this.loginForm = this.forumBld.group({  
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
  
        this.email = this.loginForm.controls['email'];     
        this.password = this.loginForm.controls['password'];     
  }

  login(): void { 
    if(this.loginForm.valid) {
        //console.log(this.email.value, this.password.value);
        //alert('Implement authentication');
        var credentials = ({email: this.email.value, password: this.password.value}); //Added next lines
          this.auth.loginWithEmail(credentials).subscribe(data => { 
            console.log(data);
             //Displays in browser message for login succussful and then goes to home page
             if (data)
            {
              alert('Login Successful!!!');
				
			  let homeModal = this.modalCtrl.create(HomePage);
  			  homeModal.present();

            }
             }, error=>{             //Added next lines for handling unknown users
            console.log(error);
            if (error.code == 'auth/user-not-found') 
            {
              alert('User not found');
            } else if (error.code == 'auth/wrong-password')
            	{
            		alert('Incorrect Password');
            	}

          });
    }

}

  home(){

  let homeModal = this.modalCtrl.create(HomePage);
  homeModal.present();

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
