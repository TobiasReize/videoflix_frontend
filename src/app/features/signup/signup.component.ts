import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, ToastMsgComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  
  toastMsgSerivce = inject(ToastMsgService);
  loginService = inject(LoginService);
  toastMsg: string = '';
  isPasswordVisible: boolean = false;
  isPasswordRepeatVisible: boolean = false;


  ngOnInit(): void {
    this.toastMsgSerivce.removeToastMsg();
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
      this.loginService.setSignupEmail('');
      ngForm.resetForm();
    } else {
      console.log('Fehler!!!');
      this.loginService.setSignupEmail('');
      this.toastMsg = 'Invalid e-mail or password! Please try again!';
      this.toastMsgSerivce.removeToastMsg();
      setTimeout(() => {
        this.toastMsgSerivce.showToastMsg();
      }, 100);
      ngForm.resetForm();
    }
  }
  

}
