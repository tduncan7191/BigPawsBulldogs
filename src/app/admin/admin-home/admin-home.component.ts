import { Component, OnInit } from '@angular/core';
import { Home } from 'src/app/interfaces/home';
import { HomeService } from 'src/app/services/home.service';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage/storage';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  picture:File
  home:Home = {
    banner:'',
    aboutUs:''
  }

  constructor(private snackBar: MatSnackBar, private service: HomeService, private storage: AngularFireStorage) { }
  
  ngOnInit(): void {
      this.getHome();
  }
  onFileChange(event){
    this.picture = event.target.files[0];
  }
  getHome(): void {
    this.service.gethome().subscribe(response => {
      this.home = response;
    });
  }
  updateHome(home:Home){
    if(this.picture){
      if(home.banner){
        this.storage.storage.refFromURL(home.banner).delete();
      }
      this.storage.upload(`${new Date().getTime()}_${this.picture.name}`, this.picture)
      .then(result => {   
        return result.ref.getDownloadURL();
      })
      .then(result => {  
        home.banner = result;
        return this.service.updateHome(home);
      })
      .then(() =>{                
          this.snackBar.open("home updated!", "Close", {
            duration: 2000,
        });
      })
      .catch(error => {            
        this.snackBar.open(error, "Close", {
          duration: 2000,
        });
      }); 
    }
    else{
      this.service.updateHome(home).then(() => {                
        this.snackBar.open("home updated!", "Close", {
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
}
