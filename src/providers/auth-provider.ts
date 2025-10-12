import { Injectable, EventEmitter } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
 
@Injectable()
export class AuthProvider {
  private authState: User | null = null;
  public onAuth: EventEmitter<User | null> = new EventEmitter();
  public user$: Observable<User | null>;
   
  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
    this.user$.subscribe((authUser: User | null) => {
      this.authState = authUser;
      this.onAuth.emit(authUser);
    });
  }
   
  loginWithEmail(credentials: { email: string; password: string }): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
    );
  }

  registerUser(credentials: { email: string; password: string }): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)
    );
  }
 
  logout(): Promise<void> {
    return signOut(this.auth);
  }
 
  get currentUser(): string {
    return this.authState ? this.authState.email || '' : '';
  } 
}
