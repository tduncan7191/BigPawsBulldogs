import { Injectable } from '@angular/core';
import { Home } from '../interfaces/home';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public database: AngularFireDatabase) {}

  gethome(): Observable<any> {
    return this.database.object(`home`).valueChanges();
  }

  updateHome(home:Home): Promise<any> {
    return this.database.object(`home`).update(home);
  }
}
