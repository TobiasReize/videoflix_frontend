import { inject, Injectable, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastMsgService } from '../toast-msg-service/toast-msg.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  toastMsgService = inject(ToastMsgService);
  router = inject(Router);
  http = inject(HttpClient);
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


  formIsValid(ngForm: NgForm) {
    return (ngForm.submitted && ngForm.form.valid);
  }


  selectErrorMsg(id: string) {
    switch (true) {
      case id == 'startpage':
        this.setToastMsg('error', 'Please enter a valid e-mail address.');
        break;
      case id == 'login' || id == 'signup':
        this.setToastMsg('error', 'Invalid e-mail or password! Please try again.');
        break;
      default:
        this.setToastMsg('error', 'An error occurred! Please try again.');
        break;
    }
  }


  setToastMsg(state: 'error' | 'ok', msg: string) {
    setTimeout(() => {
      this.toastMsgService.showToastMsg(state, msg);
    }, 100);
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
    // tbd.
  }


  formSubmitSignup(ngForm: NgForm) {
    if (this.passwordsMatch(ngForm)) {
      // tbd.
      this.setToastMsg('ok', 'E-mail sent! Please confirm your e-mail address.');
    } else {
      this.setToastMsg('error', 'Passwords don\'t match! Please try again.');
    }
    this.signupEmailSignal.set('');
  }


  formSubmitForgotPassword() {
    this.setToastMsg('ok', 'E-mail sent! Please follow the instructions.');
    // tbd.
  }


  formSubmitResetPassword(ngForm: NgForm) {
    if (this.passwordsMatch(ngForm)) {
      // tbd.
      this.setToastMsg('ok', 'Success! Your password has been changed.');
    } else {
      this.setToastMsg('error', 'Passwords don\'t match! Please try again.');
    }
  }


  passwordsMatch(ngForm: NgForm) {
    return (ngForm.form.value.password === ngForm.form.value.passwordRepeat);
  }


}
