import { Contact } from './../interfaces/Contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  contact: Contact;

  get f() { return this.form.controls; }

  constructor(private snackBar: MatSnackBar, private service: ContactService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  onSubmit() {    
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }
    this.contact = {
      toEmail: 'tduncan@redemptionplus.com',//'krduncan71@yahoo.com',
      name: this.form.value.name, 
      email: this.form.value.email, 
      message: this.form.value.message
    };
    this.service.sendEmail(this.contact).then((response:any) => {
      this.snackBar.open(response.message, "Close", {
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
