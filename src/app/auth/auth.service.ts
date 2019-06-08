import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    constructor(private router: Router, private snackBar: MatSnackBar) {}

    get IsAuthenticated(){
        return localStorage.getItem('token') !== null;
    }
    
    login(loginData:User):void{
        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
            .then(response => {
                localStorage.setItem('email', response.user.email);
                return response.user.getIdToken(true);
            }).then(token => {
                localStorage.setItem('token', token);
                this.router.navigate(['admin/home']);
            })
            .catch(error => {        
                this.snackBar.open("Wrong Username or Password", "Close", {
                    duration: 2000,
                });
            });
    }

    logout():void{
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.router.navigate(['']);
        })
        .catch(error => {
            this.snackBar.open(error, "Close", {
                duration: 2000,
            });
        });
    }
    
    changePassword():void{
        
    }
}