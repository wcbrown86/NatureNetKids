import { Injectable } from '@angular/core';
import { Database, ref, query, orderByChild, equalTo, limitToLast } from '@angular/fire/database';

@Injectable()
export class EventData {

  constructor(private database: Database) {
  }

  getLimitedCategoryList(number: number): any {
    const observationsRef = ref(this.database, '/observations');
    // Get only the NNK observations
    return query(observationsRef, orderByChild("activity"), equalTo('NNK'), limitToLast(number));
  }

  // Not implemented, is used to get the users from firebase for name retrieval
  getUserFromFirebase(uid: string) {
    const usersRef = ref(this.database, '/users');
    return query(usersRef, equalTo(uid));
  }

}
