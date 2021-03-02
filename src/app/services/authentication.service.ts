import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }


  login() {
    var dummy_response = {
      user_id: '007',
      user_name: 'test'
    };
    this.storage.set('USER_INFO', dummy_response).then((response) => {
      this.router.navigate(['tabs']);
      this.authState.next(true);
    });
  }

  registerUser(usuario) {
    console.log (usuario)
    return this.http.post(`${environment.apiUrl}/register.php`, JSON.stringify(usuario));
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['home']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }



}