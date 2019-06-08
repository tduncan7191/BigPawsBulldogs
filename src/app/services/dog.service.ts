import { Dog } from './../interfaces/Dog';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(public database: AngularFireDatabase) {}

  getDogs(dogType:string): Observable<any[]> {
    return this.database.list(`${dogType}`).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  
  getDog(dogType:string, key:string): Observable<any> {
    return this.database.object(`${dogType}/${key}`).valueChanges();
  }
  
  addDog (dogType:string, dog:Dog): firebase.database.ThenableReference {
    return this.database.list(`${dogType}`).push(dog);
  }

  deleteDog(dogType:string, key:string): Promise<any> {
    return this.database.object(`${dogType}/${key}`).remove();
  }

  updateDog(dogType:string, key:string, dog:Dog): Promise<any> {
    return this.database.object(`${dogType}/${key}`).update(dog);
  }

  deletePicture(dogType:string, key:string, index:number): Promise<any> {    
    return this.database.object(`${dogType}/${key}/pictures/${index}`).remove();
  }
}
