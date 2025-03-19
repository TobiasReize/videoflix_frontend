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


  getOptimalVideoFormat(): string {
    const maxDimension = Math.max(window.innerWidth, window.innerHeight);
    if (maxDimension <= 480) {
      return '120p';
    } else if (maxDimension <= 768) {
      return '360p';
    } else if (maxDimension <= 1280) {
      return '720p';
    } else {
      return '1080p';
    }
  }
  
}
