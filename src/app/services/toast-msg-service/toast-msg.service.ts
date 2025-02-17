import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMsgService {

  private toastMsgSignal = signal<boolean>(false);
  readonly toastMsg = this.toastMsgSignal.asReadonly();


  constructor() { }


  setToastMsg() {
    this.toastMsgSignal.set(true);
  }

  resetToastMsg() {
    this.toastMsgSignal.set(false);
  }

}
