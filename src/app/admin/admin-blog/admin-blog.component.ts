import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/Blog';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {

  key: string;
  featuredBlog:Blog = {
    picture: '',
    title: '',
    content: '',
    date: new Date().toString()
  };
  blogs:Blog[] = [];
  picture:File;
  blog:Blog = {
    picture: '',
    title: '',
    content: '',
    date: new Date().toString()
  }

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private service: BlogService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.getBlogs();
    this.getFeaturedBlog();
  }
  onFileChange(event){
    this.picture = event.target.files[0];
  }
  getFeaturedBlog(){
    this.service.getFeaturedBlog().subscribe((response:Blog) => {
      this.featuredBlog = response;
    });
  }

  getBlogs(){
    this.service.getBlogs().subscribe((response:Blog[]) => {
      this.blogs = response;
    });
  }

  updateFeaturedBlog(blog: Blog) { 
    blog.date = new Date().toString()
    this.service.updateFeaturedBlog(blog).then(response => {              
      this.snackBar.open("Featured Blog updated!", "Close", {
        duration: 2000,
      });
    })
    .catch(error => {            
      this.snackBar.open(error, "Close", {
        duration: 2000,
      });
    }); 
  }
  
  addBlog(blog: Blog) { 
    if(this.picture){
      this.storage.upload(`${new Date().getTime()}_${this.picture.name}`, this.picture)
      .then(result => {   
        return result.ref.getDownloadURL();
      })
      .then(result => {  
        blog.picture = result;
        return this.service.addBlog(blog);
      })
      .then(() =>{                
          this.snackBar.open("blog added!", "Close", {
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
      this.service.addBlog(blog).then(() => {           
        this.snackBar.open("Blog added!", "Close", {
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
