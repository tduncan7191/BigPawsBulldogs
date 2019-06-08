import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdminDogComponent } from './admin-dog/admin-dog.component';
import { AdminDogDetailComponent } from './admin-dog-detail/admin-dog-detail.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminBlogDetailComponent } from './admin-blog-detail/admin-blog-detail.component';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminHomeComponent, 
    FileUploadComponent, 
    AdminDogComponent, 
    AdminDogDetailComponent, AdminNavigationComponent, AdminBlogComponent, AdminBlogDetailComponent
  ],
  imports: [
    FormsModule,
    MatCardModule, MatIconModule,
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],  
})
export class AdminModule { }
