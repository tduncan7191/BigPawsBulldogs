import { Component }   from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/app/interfaces/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = false;
  loginForm: FormGroup;
  loginData:User;

  get f(){ return this.loginForm.controls; }

  constructor(private formBuilder: FormBuilder, public auth: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loginData = {
      email: this.loginForm.value.email, 
      password: this.loginForm.value.password
    };
    this.auth.login(this.loginData);   
  } 
}