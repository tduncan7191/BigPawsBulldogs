import { DogService } from './../services/dog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dog } from '../interfaces/Dog';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit{
  
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  key: string;
  dogType: string;
  images: GALLERY_IMAGE[] = [];  
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
    backdropColor: "rgba(13,13,14,0.85)", // gallery backdrop (background) color (default rgba(13,13,14,0.85))
    showArrows: true 
  };	 
  
  dog: Dog = {
    name: '',
    description: '',
    pictures: []
  };

  constructor(private route: ActivatedRoute, private service: DogService) { }
    
  ngOnInit(){
    this.key = this.route.snapshot.paramMap.get('key');
    this.route.url.subscribe(params => {
      this.dogType = params[0].path;
      this.getDog();
    });
  }

  getDog(){    
    this.service.getDog(this.dogType, this.key).subscribe(response =>{
      this.dog = response;
      this.dog.pictures.forEach(picture => {
        this.images.push({url:picture});
      })
      this.ngxImageGallery.open(0);
    }); 
  }

}
