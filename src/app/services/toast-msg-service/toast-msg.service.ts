import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMsgService {

  private toastMsgSignal = signal<boolean>(false);
  readonly toastMsg = this.toastMsgSignal.asReadonly();


  constructor() { }


  showToastMsg() {
    this.toastMsgSignal.set(true);
  }

  removeToastMsg() {
    this.toastMsgSignal.set(false);
  }

}
