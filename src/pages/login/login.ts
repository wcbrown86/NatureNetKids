// Default import from page creations
import { Component, OnInit } from '@angular/core';
// imports for navigation control
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// added AuthProvider used for login functions
import { AuthProvider } from '../../providers/auth-provider'; 
// Angular form builder
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginPage implements OnInit {

  // global variables to store information 
  loginForm!: FormGroup;
  email!: AbstractControl;
  password!: AbstractControl;
  error: any;

  // constructor for variable injection needed for navigation and AuthProvider
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public auth: AuthProvider,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  
    this.email = this.loginForm.controls['email'];     
    this.password = this.loginForm.controls['password'];     
  }

  async login(): Promise<void> { 
    if (this.loginForm.valid) {
      const credentials = { email: this.email.value, password: this.password.value };
      this.auth.loginWithEmail(credentials).subscribe({
        next: async (data) => { 
          // Displays message for login successful and then goes to home page
          if (data) {
            const alert = await this.alertController.create({
              header: 'Success',
              message: 'Login Successful!!!',
              buttons: ['OK']
            });
            await alert.present();
            this.router.navigate(['/home']);
          }
        }, 
        error: async (error) => {
          let message = 'Login failed';
          if (error.code === 'auth/user-not-found') { 
            message = 'User Not Found'; 
          }
          if (error.code === 'auth/wrong-password') { 
            message = 'Incorrect Password'; 
          }
          const alert = await this.alertController.create({
            header: 'Error',
            message: message,
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'You must fill out all the fields correctly to login.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // when called takes the user to the signup page
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  // When called function takes the user to the home page 
  home() {
    this.router.navigate(['/home']);
  }

  // when this function is called the user is taken to the help page
  help() {
    this.router.navigate(['/help']);
  }

}
