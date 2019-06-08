import { BlogService } from './../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from '../interfaces/Blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  featuredBlog: Blog;
  blogs: Blog[] = [];

  constructor(private service: BlogService) { }
  
  ngOnInit(): void {
      this.getBlogs();
      this.getFeaturedBlog();
  }

  getFeaturedBlog(): void {
    this.service.getFeaturedBlog().subscribe((response:Blog) => {
      this.featuredBlog = response;
    });
  }
  getBlogs():void  {
    this.service.getBlogs().subscribe((response:Blog[]) => {
      this.blogs = response;
    });
  }
}
