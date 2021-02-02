import { NgForm }         from "@angular/forms";
import  { Component }     from '@angular/core';
import { AuthService }    from '../auth.service';

@Component({
  //selector: 'selector-name',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
})

export class SignupComponent {
  isLoading = false;

  constructor(public authService: AuthService){

  }

  onSignup(form: NgForm) {
    //console.log(form.value);
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.username)
  }
}
