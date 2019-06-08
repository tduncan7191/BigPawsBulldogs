import { AdminBlogDetailComponent } from './admin-blog-detail/admin-blog-detail.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDogComponent } from './admin-dog/admin-dog.component';
import { AdminDogDetailComponent } from './admin-dog-detail/admin-dog-detail.component';

const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'home', component: AdminHomeComponent },
          { path: 'studs', component: AdminDogComponent },
          { path: 'studs/:key', component: AdminDogDetailComponent },
          { path: 'dames', component: AdminDogComponent },
          { path: 'dames/:key', component: AdminDogDetailComponent },
          { path: 'past-puppies', component: AdminDogComponent },
          { path: 'past-puppies/:key', component: AdminDogDetailComponent },
          { path: 'available-puppies', component: AdminDogComponent },
          { path: 'available-puppies/:key', component: AdminDogDetailComponent },
          { path: 'blog', component: AdminBlogComponent },
          { path: 'blog-detail/:key', component: AdminBlogDetailComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
