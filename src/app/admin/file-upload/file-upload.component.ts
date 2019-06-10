import { Component } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Dog } from 'src/app/interfaces/Dog';
import { DogService } from 'src/app/services/dog.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  
  key: string;
  dogType:string;  
  promises: Promise<any>[] = [];
  files: File[] =[];
  dogs: Dog[];
  dog: Dog = {
    name: '',
    description: '',
    pictures: [],
    profilePictureIndex: 0
  }

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private storage: AngularFireStorage, private service: DogService) { }

  ngOnInit() {
    this.route.url.subscribe(params => {
      this.dogType = params[0].path;
      this.getDogs();
    });
  }

  getDogs(){
    this.service.getDogs(this.dogType).subscribe(response => {
      this.dogs = response;
    }); 
  }

  addToFilesList(fileList: FileList){
    if(fileList.length !== 0){
      Array.from(fileList).forEach(file => { 
        this.files.push(file);
      });
    }
  }

  startUpload() {
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
      this.service.addDog(this.dogType, this.dog).then(() => {            
        this.snackBar.open("finished upload!", "Close", {
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