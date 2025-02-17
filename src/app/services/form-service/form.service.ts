import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private signupEmailSignal = signal<string>('');
  readonly signupEmail = this.signupEmailSignal.asReadonly();


  constructor() { }


  setSignupEmail(email: string) {
    this.signupEmailSignal.set(email);
  }

}
