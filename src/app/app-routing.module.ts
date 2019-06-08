import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AdminComponent } from './admin/admin/admin.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DogComponent } from './dog/dog.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'studs', component: DogComponent },
  { path: 'studs/:key', component: DogDetailComponent },
  { path: 'dames', component: DogComponent },
  { path: 'dames/:key', component: DogDetailComponent },
  { path: 'past-puppies', component: DogComponent },
  { path: 'past-puppies/:key', component: DogDetailComponent },
  { path: 'available-puppies', component: DogComponent },
  { path: 'available-puppies/:key', component: DogDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },  
  { path: 'blog-detail/:key', component: BlogDetailComponent },  
  { path: 'featuredBlog', component: BlogDetailComponent },  
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
