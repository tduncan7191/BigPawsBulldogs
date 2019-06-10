import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService } from 'src/app/services/dog.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Dog } from 'src/app/interfaces/Dog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-dog-detail',
  templateUrl: './admin-dog-detail.component.html',
  styleUrls: ['./admin-dog-detail.component.css']
})
export class AdminDogDetailComponent implements OnInit {

  key: string;
  dogType:string;  
  promises: Promise<any>[] = [];
  files: File[] =[];
  dog: Dog = {
    name: '',
    description: '',
    pictures: [],
    profilePictureIndex: 0
  };

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private service: DogService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.route.url.subscribe(params => {
      this.dogType = params[0].path;
      this.getDog();
    });
  }

  getDog(){
    this.service.getDog(this.dogType, this.key).subscribe(response => {
      this.dog = response;
    }); 
  }

  addToFilesList(fileList: FileList){
    if(fileList.length !== 0){
      Array.from(fileList).forEach(file => { 
        this.files.push(file);
      });
    }
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
  
  deletePicture(picture:string, index: number){
    this.storage.storage.refFromURL(picture).delete();
    this.service.deletePicture(this.dogType, this.key, index).then(() => {            
      this.snackBar.open("picture deleted!", "Close", {
        duration: 2000,
      });      
    })
    .catch(error => {            
      this.snackBar.open(error, "Close", {
        duration: 2000,
      });
    }); 
  }

  setAsProfile(index: number){
    this.dog.profilePictureIndex = index;
    this.service.updateDog(this.dogType, this.key, this.dog)
    .then(() => {            
      this.snackBar.open("profile picture updated!", "Close", {
        duration: 2000,
      });      
    })
    .catch(error => {            
      this.snackBar.open(error, "Close", {
        duration: 2000,
      });
    }); 
  }

  update(dog: Dog) {
    this.files.forEach(file =>{    
      var storagePromise = this.storage.upload(`${new Date().getTime()}_${file.name}`, file)
      .then(result => {   
        return result.ref.getDownloadURL();
      })
      .then(result => {  
        this.dog.pictures.push(result);
      })
      .catch(error => {
        this.snackBar.open(error, "Close", {
          duration: 2000,
        });      
      }); 
      this.promises.push(storagePromise);
    });    
    Promise.all(this.promises).then(() => {
      this.service.updateDog(this.dogType, this.key, dog).then(() => {            
        this.snackBar.open("finished update!", "Close", {
          duration: 2000,
        });      
      })
      .catch(error => {            
        this.snackBar.open(error, "Close", {
          duration: 2000,
        });
      }); 
    });  
  }
}
