import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'cp-login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    const provider = new firebase.auth.TwitterAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }

  loginAnon() {
    this.afAuth.auth.signInAnonymously().then(user => {
      this.router.navigate(['vote']);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

