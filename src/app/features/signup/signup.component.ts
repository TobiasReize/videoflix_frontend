import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { FormService } from '../../services/form-service/form.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, ToastMsgComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  
  toastMsgService = inject(ToastMsgService);
  formService = inject(FormService);
  isPasswordVisible: boolean = false;
  isPasswordRepeatVisible: boolean = false;


  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
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
    this.resetServices();
    if (this.formIsValid(ngForm)) {
      console.log('Form:', ngForm.form.value);
      if (this.passwordsMatch(ngForm)) {
        this.setToastMsg('ok', 'E-mail sent! Please confirm your e-mail address.');
      } else {
        this.setToastMsg('error', 'Passwords don\'t match! Please try again.');
      }
    } else {
      console.log('Fehler!!!');
      this.setToastMsg('error', 'Invalid e-mail or password! Please try again.');
    }
    ngForm.resetForm();
  }


  formIsValid(ngForm: NgForm) {
    return (ngForm.submitted && ngForm.form.valid);
  }


  passwordsMatch(ngForm: NgForm) {
    return (ngForm.form.value.password === ngForm.form.value.passwordRepeat);
  }


  setToastMsg(state: 'error' | 'ok', msg: string) {
    setTimeout(() => {
      this.toastMsgService.showToastMsg(state, msg);
    }, 100);
  }


  resetServices() {
    this.formService.setSignupEmail('');
    this.toastMsgService.resetToastMsg();
  }
  
}
