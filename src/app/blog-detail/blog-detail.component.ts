import { Component, OnInit } from '@angular/core';
import { Blog } from '../interfaces/Blog';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  
  key: string;
  blogType:string;
  blog:Blog = {
    picture: '',
    title: '',
    content: '',
    date: new Date().toString()
  }

  constructor(private route: ActivatedRoute, private service: BlogService) { }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');    
    this.route.url.subscribe(params => {
      this.blogType = params[0].path;
      this.getBlog();
    });
  }
  
  getBlog(){
    if(this.blogType == "featuredBlog"){
      this.service.getFeaturedBlog().subscribe((response:Blog) => {
        this.blog = response;
      }); 
    }
    else{
      this.service.getBlog(this.key).subscribe(response => {
        this.blog = response;
      }); 
    }
  }

}
