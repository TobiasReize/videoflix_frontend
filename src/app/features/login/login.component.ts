import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  }
  isPasswordVisible: boolean = false;


  showPassword(state:boolean) {
    if (state == true) {
      this.isPasswordVisible = true;
    } else {
      this.isPasswordVisible = false;
    }
  }


  onSubmit(ngForm: NgForm) {
      if (ngForm.submitted && ngForm.form.valid) {
        // tbd.
        console.log('Erfolgreich!');
        ngForm.resetForm();
      } else {
        console.log('Fehler!!!');
      }
  }

}
