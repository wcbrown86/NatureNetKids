import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

/*
  Generated class for the EventData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventData {

  constructor() {
    //console.log('Hello EventData Provider');
  }

  getLimitedCategoryList(number): any {
    return firebase.database().ref('/observations').limitToLast(number);
  }

  getUserFromFirebase(uid){
    return firebase.database().ref('/users').equalTo(uid);
  }

}
