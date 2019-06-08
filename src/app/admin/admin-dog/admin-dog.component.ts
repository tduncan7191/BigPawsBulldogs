import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/interfaces/Dog';
import { DogService } from 'src/app/services/dog.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-dog',
  templateUrl: './admin-dog.component.html',
  styleUrls: ['./admin-dog.component.css']
})
export class AdminDogComponent implements OnInit {

  dogs: Dog[];
  dogType: string;
  
  constructor(private snackBar: MatSnackBar, private service: DogService, private storage: AngularFireStorage, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      console.log(params[0].path);
      this.dogType = params[0].path;
      this.getDogs();
    });
  }

  getDogs(): void {
    this.service.getDogs(this.dogType).subscribe(result => {
      this.dogs = result;
    });
  }

  deleteDog(dog:any): void{
    if(dog.pictures){
      dog.pictures.forEach(picture => {      
        this.storage.storage.refFromURL(picture).delete();
      });
    }
    this.service.deleteDog(this.dogType, dog.key).then(response => {            
      this.snackBar.open("dog deleted!", "Close", {
        duration: 2000,
      });      
    })
    .catch(error => {            
      this.snackBar.open(error, "Close", {
        duration: 2000,
      });
    }); 
  }

}
