import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private screenWidthSignal = signal<number>(window.innerWidth);
  readonly screenWidth = this.screenWidthSignal.asReadonly();

  readonly isMobile = computed<boolean>(() => this.screenWidth() <= 1025);


  constructor() { }


  setScreenWidth(width: number) {
    this.screenWidthSignal.set(width);
  }
}
