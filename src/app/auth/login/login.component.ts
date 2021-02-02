import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  // selector: 'selector-name',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService){

  }

  onLogin(form: NgForm) {
    if(form.invalid){}
    this.isLoading = true;
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
