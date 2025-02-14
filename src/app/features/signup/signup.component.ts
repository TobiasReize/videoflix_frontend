import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToastErrorComponent } from '../../shared/toast-error/toast-error.component';
import { ToastErrorService } from '../../services/toast-error.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, ToastErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  
  toastErrorSerivce = inject(ToastErrorService);
  toastErrorMsg: string = '';
  isPasswordVisible: boolean = false;
  isPasswordRepeatVisible: boolean = false;


  ngOnInit(): void {
    this.toastErrorSerivce.resetToastError();
  }


  showPassword(id: string, state: boolean) {
    if (id == 'password') {
      if (state == true) {
        this.isPasswordVisible = true;
      } else {
        this.isPasswordVisible = false;
      }
    } else {
      if (state == true) {
        this.isPasswordRepeatVisible = true;
      } else {
        this.isPasswordRepeatVisible = false;
      }
    }
  }


  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      // tbd.
      console.log('Form:', ngForm.form.value);
      ngForm.resetForm();    
    } else {
      console.log('Fehler!!!');
      this.toastErrorMsg = 'Invalid e-mail or password! Please try again!';
      this.toastErrorSerivce.resetToastError();
      setTimeout(() => {
        this.toastErrorSerivce.setToastError();
      }, 100);
      ngForm.resetForm();
    }
  }
  

}
