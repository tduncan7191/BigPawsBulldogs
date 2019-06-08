import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../interfaces/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public database: AngularFireDatabase) {}

  getBlogs(): Observable<any[]> {
    return this.database.list(`blogs`).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  
  getBlog(key:string): Observable<any> {
    return this.database.object(`blogs/${key}`).valueChanges();
  }
  
  addBlog (blog:Blog): firebase.database.ThenableReference {
    return this.database.list(`blogs`).push(blog);
  }

  deleteBlog(key:string): Promise<any> {
    return this.database.object(`blogs/${key}`).remove();
  }

  updateBlog(key:string, blog:Blog): Promise<any> {
    return this.database.object(`blogs/${key}`).update(blog);
  }

  getFeaturedBlog(): Observable<any>{
    return this.database.object(`featuredBlog`).valueChanges();
  }

  updateFeaturedBlog(blog:Blog): Promise<any> {
    return this.database.object(`featuredBlog`).update(blog);
  }
}
