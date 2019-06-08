import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatMenuModule, MatCardModule, MatButtonModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './auth/login/login.component';
import { DogComponent } from './dog/dog.component';
import { DogDetailComponent } from './dog-detail/dog-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import * as firebase from 'firebase';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    BlogComponent,
    LoginComponent,
    DogComponent,
    DogDetailComponent,
    NavigationComponent,
    BlogDetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    MatInputModule, MatListModule, MatMenuModule, MatButtonModule, MatListModule, MatCardModule, MatToolbarModule, MatIconModule,
    NgxImageGalleryModule,
    BrowserModule, 
    FlexLayoutModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,    
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,  
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

