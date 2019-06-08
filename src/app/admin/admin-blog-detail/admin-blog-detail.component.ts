import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Blog } from 'src/app/interfaces/Blog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-blog-detail',
  templateUrl: './admin-blog-detail.component.html',
  styleUrls: ['./admin-blog-detail.component.css']
})
export class AdminBlogDetailComponent implements OnInit {
  
  key: string;
  picture:File;
  blog:Blog = {
    picture: '',
    title: '',
    content: '',
    date: new Date().toString()
  }

  constructor(private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute, private service: BlogService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');   
    this.getBlog(); 
  }
  onFileChange(event){
    this.picture = event.target.files[0];
  }
  getBlog(){
    this.service.getBlog(this.key).subscribe(response => {
      this.blog = response;
    }); 
  }
  update(blog: Blog) { 
    if(this.picture){
      this.storage.upload(`${new Date().getTime()}_${this.picture.name}`, this.picture)
      .then(result => {   
        return result.ref.getDownloadURL();
      })
      .then(result => {  
        blog.picture = result;
        return this.service.updateBlog(this.key, blog);
      })
      .then(() => {                
          this.snackBar.open("Blog updated!", "Close", {
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
      this.service.updateBlog(this.key, blog).then(() => {                
        this.snackBar.open("Blog updated!", "Close", {
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

  delete(blog:Blog): void{
    if(blog.picture){
      this.storage.storage.refFromURL(blog.picture).delete();
    }
    this.service.deleteBlog(this.key).then(response => {            
      this.snackBar.open("Blog deleted!", "Close", {
        duration: 2000,
      });      
      this.router.navigate(['admin/blog'])
    })
    .catch(error => {            
      this.snackBar.open(error, "Close", {
        duration: 2000,
      });
    }); 
  }
}
