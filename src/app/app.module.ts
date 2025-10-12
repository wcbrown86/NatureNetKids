import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Cloudinary
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular';
import { Cloudinary } from 'cloudinary-core';

// Providers
import { AuthProvider } from '../providers/auth-provider';
import { EventData } from '../providers/event-data';

// Storage
import { IonicStorageModule } from '@ionic/storage-angular';

// Environment
import { environment } from '../environments/environment';

export const firebaseConfig = environment.firebase;

export const cloudinaryLib = new Cloudinary({
  cloud_name: environment.cloudinary.cloudName,
  api_key: environment.cloudinary.apiKey,
  secure: true
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'testnet' } as CloudinaryConfiguration)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    AuthProvider,
    EventData
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
