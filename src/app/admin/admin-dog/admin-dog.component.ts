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

  dogs: Dog[] = [];
  dogType: string;
  
  constructor(private snackBar: MatSnackBar, private service: DogService, private storage: AngularFireStorage, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      this.dogType = params[0].path;
      this.getDogs();
    });
  }

  getDogs(): void {
    this.service.getDogs(this.dogType).subscribe((result:Dog[]) => {
      this.dogs = result;
    });
  }
}
