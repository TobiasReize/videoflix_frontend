import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastErrorService {

  private toastErrorSignal = signal(false);
  readonly toastError = this.toastErrorSignal.asReadonly();


  constructor() { }


  setToastError() {
    this.toastErrorSignal.set(true);
  }

  resetToastError() {
    this.toastErrorSignal.set(false);
  }

}
