import { HomeService } from './../services/home.service';
import { Component, OnInit } from '@angular/core';
import { Home } from '../interfaces/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home:Home = {
    banner:'',
    aboutUs:''
  }
  constructor(private service: HomeService) { }
  
  ngOnInit(): void {
      this.getHome();
  }

  getHome(): void {
    this.service.gethome().subscribe(response => {
      this.home = response;
    });
  }
}
