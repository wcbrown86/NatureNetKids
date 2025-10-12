import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthProvider } from '../../providers/auth-provider';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['signup.scss']
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  email!: AbstractControl;
  password!: AbstractControl;
  error: any;
 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private auth: AuthProvider,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  
    this.email = this.signupForm.controls['email'];     
    this.password = this.signupForm.controls['password'];
  }
 
  async submit(): Promise<void> { 
    if (this.signupForm.valid) {
      const credentials = { email: this.email.value, password: this.password.value };
      this.auth.registerUser(credentials).subscribe({
        next: async (registerData) => {
          const alert = await this.alertController.create({
            header: 'Success',
            message: 'You are registered and logged in.',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/home']);
        }, 
        error: async (registerError) => {
          let message = 'Registration failed';
          if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use') {
            message = registerError.message;
          }
          const alert = await this.alertController.create({
            header: 'Error',
            message: message,
            buttons: ['OK']
          });
          await alert.present();
          this.error = registerError;
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'You must fill out all the fields correctly to signup.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  home() {
    this.router.navigate(['/home']);
  } 

  help() {
    this.router.navigate(['/help']);
  }
}
