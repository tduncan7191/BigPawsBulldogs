import { Component, OnInit, ViewChild } from '@angular/core';
import { Dog } from '../interfaces/Dog';
import { DogService } from '../services/dog.service';
import { ActivatedRoute } from '@angular/router';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from 'ngx-image-gallery';


@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit{
  
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  dogs: Dog[];
  dogType: string;
  images: GALLERY_IMAGE[] = [];
  galleryArray: GALLERY_IMAGE[][] = [];  
  conf: GALLERY_CONF = {
    imageOffset: '20px', // add gap between image and it's container (default 20px)
    inline: true,
    imageBorderRadius: "10px", // css border radius of image (default 3px)     
    imagePointer: false, // show a pointer on image, should be true when handling onImageClick event (default false)
    showDeleteControl: false, // show image delete icon (default false)
    showCloseControl: false, // show gallery close icon (default true)
    showExtUrlControl: true, // show image external url icon (default true)
    showImageTitle: true, // show image title text (default true)
    showThumbnails: true, // show thumbnails (default true)
    closeOnEsc: false, // close gallery on `Esc` button press (default true)
    reactToKeyboard: true, // change image on keyboard arrow press (default true)
    reactToMouseWheel: true, // change image on mouse wheel scroll (default true)
    reactToRightClick: false, // disable right click on gallery (default false)
    thumbnailSize: 50, // thumbnail size (default 30)
    //backdropColor: "rgba(13,13,14,0.85)", // gallery backdrop (background) color (default rgba(13,13,14,0.85))
    showArrows: true 
  };
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
    this.service.getDogs(this.dogType).subscribe(response =>{
      this.dogs = response;
      this.dogs.forEach(dog =>{
        console.log(dog.name, dog.pictures.length);
        if(dog.pictures){
          for(var i = 0; i < dog.pictures.length; i++){
            if(i == dog.profilePictureIndex){
              if(dog.pictures[i]){
                this.images.push({url:dog.pictures[i]})
              }
            }
          }
          for(var i = 0; i < dog.pictures.length; i++){
            if(i != dog.profilePictureIndex){
              if(dog.pictures[i]){
                this.images.push({url:dog.pictures[i]})
              }
            }
          }
        }
        this.galleryArray.push(this.images);
        this.images = [];
      });
    }); 
  }
}
