import { Component, OnInit } from '@angular/core';
import { Dog } from '../interfaces/Dog';
import { DogService } from '../services/dog.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit{

  dogs: Dog[];
  dogType: string;

  constructor(private service: DogService, public route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.url.subscribe(params => {
      this.dogType = params[0].path;
      this.getDogs();
    });
  }

  getDogs(): void {
    this.service.getDogs(this.dogType).subscribe(response => {
      this.dogs = response;
    });
  }
}
