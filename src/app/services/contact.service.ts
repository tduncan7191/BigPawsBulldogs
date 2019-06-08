import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/Contact';
import { MatSnackBar } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, public database: AngularFireDatabase) { }

  sendEmail(contact:Contact): Promise<any> {
    let url = `https://us-central1-bigpawsbulldogs.cloudfunctions.net/SendEmail`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post(url, contact, httpOptions).toPromise();  
  }
}
