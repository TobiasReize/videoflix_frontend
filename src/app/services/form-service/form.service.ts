import { inject, Injectable, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMsgService } from '../toast-msg-service/toast-msg.service';
import { ApiService } from '../api-service/api.service';
import { config } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  toastMsgService = inject(ToastMsgService);
  router = inject(Router);
  apiService = inject(ApiService);
  private signupEmailSignal = signal<string>('');
  readonly signupEmail = this.signupEmailSignal.asReadonly();


  constructor() { }


  setSignupEmail(email: string) {
    this.signupEmailSignal.set(email);
  }


  formSubmit(id: string, ngForm: NgForm) {
    this.toastMsgService.resetToastMsg();
    if (this.formIsValid(ngForm)) {
      console.log('Form:', ngForm.form.value);
      this.selectFormFunction(id, ngForm);
    } else {
      console.log('Fehler!!!');
      this.selectErrorMsg(id);
      this.signupEmailSignal.set('');
    }
    ngForm.resetForm();
  }


  selectErrorMsg(id: string) {
    switch (true) {
      case id == 'startpage':
        this.toastMsgService.setToastMsg('error', 'Please enter a valid e-mail address.');
        break;
      case id == 'login' || id == 'signup':
        this.toastMsgService.setToastMsg('error', 'Invalid e-mail or password! Please try again.');
        break;
      default:
        this.toastMsgService.setToastMsg('error', 'An error occurred! Please try again.');
        break;
    }
  }


  selectFormFunction(id: string, ngForm: NgForm) {
    switch (id) {
      case 'startpage':
        this.formSubmitStartpage();
        break;
      case 'login':
        this.formSubmitLogin(ngForm);
        break;
      case 'signup':
        this.formSubmitSignup(ngForm);
        break;
      case 'forgot-password':
        this.formSubmitForgotPassword();
        break
      case 'reset-password':
        this.formSubmitResetPassword(ngForm);
        break
    }
  }


  formSubmitStartpage() {
    this.router.navigateByUrl('signup');
  }


  formSubmitLogin(ngForm: NgForm) {
    const payload = {
      username: ngForm.form.value.email,
      password: ngForm.form.value.password
    };
    this.apiService.postData(config.LOGIN_URL, payload).subscribe({
      next: data => {
        this.setCurrentUser(data);
        this.router.navigateByUrl('video-offer');
      },
      error: err => this.toastMsgService.setToastMsg('error', this.getErrorMsg(err.error)), 
    });
  }


  formSubmitSignup(ngForm: NgForm) {
    if (this.passwordsMatch(ngForm)) {
      // tbd.
      this.toastMsgService.setToastMsg('ok', 'E-mail sent! Please confirm your e-mail address.');
    } else {
      this.toastMsgService.setToastMsg('error', 'Passwords don\'t match! Please try again.');
    }
    this.signupEmailSignal.set('');
  }


  formSubmitForgotPassword() {
    this.toastMsgService.setToastMsg('ok', 'E-mail sent! Please follow the instructions.');
    // tbd.
  }


  formSubmitResetPassword(ngForm: NgForm) {
    if (this.passwordsMatch(ngForm)) {
      // tbd.
      this.toastMsgService.setToastMsg('ok', 'Success! Your password has been changed.');
    } else {
      this.toastMsgService.setToastMsg('error', 'Passwords don\'t match! Please try again.');
    }
  }


  // Hilfsfunktionen:
  formIsValid(ngForm: NgForm) {
    return (ngForm.submitted && ngForm.form.valid);
  }


  passwordsMatch(ngForm: NgForm) {
    return (ngForm.form.value.password === ngForm.form.value.passwordRepeat);
  }


  setCurrentUser(data: any) {
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('user_id', data.user_id);
  }


  getErrorMsg(err: any): string {
    const key = Object.keys(err)[0];
    return err[key][0];
  }

}
