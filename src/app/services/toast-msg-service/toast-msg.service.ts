import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMsgService {

  private toastMsgSignal = signal<string>('');
  readonly toastMsg = this.toastMsgSignal.asReadonly();

  private toastStateSignal = signal<'error' | 'ok' | 'unset'>('unset');
  readonly toastState = this.toastStateSignal.asReadonly();


  constructor() { }


  showToastMsg(state: 'error' | 'ok', msg: string) {
    this.toastMsgSignal.set(msg);
    this.toastStateSignal.set(state);
  }


  resetToastMsg() {
    this.toastStateSignal.set('unset');
    this.toastMsgSignal.set('');
  }


  setToastMsg(state: 'error' | 'ok', msg: string) {
    setTimeout(() => {
      this.showToastMsg(state, msg);
    }, 100);
  }

}
