import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private currentVideoTitleSignal = signal<string>('');
  readonly currentVideoTitle = this.currentVideoTitleSignal.asReadonly();

  private currentVideoDescriptionSignal = signal<string>('');
  readonly currentVideoDescription = this.currentVideoDescriptionSignal.asReadonly();

  private backgroundStyleSignal = signal<string>('linear-gradient(rgba(20, 20, 20, 0.6), rgba(20, 20, 20, 0), rgba(20, 20, 20, 1.0))');
  readonly backgroundStyle = this.backgroundStyleSignal.asReadonly();

  private imageUrlSignal = signal<string>('');
  readonly imageUrl = this.imageUrlSignal.asReadonly();

  readonly currentVideoPreview = computed<string>(() => `${this.backgroundStyle()}, ${this.imageUrl()}`);

  private showMobileDescriptionSignal = signal<boolean>(false);
  readonly showMobileDescription = this.showMobileDescriptionSignal.asReadonly();


  constructor() { }


  setCurrentVideoTitle(title: string) {
    this.currentVideoTitleSignal.set(title);
  }
  
  
  setCurrentVideoDescription(description: string) {
    this.currentVideoDescriptionSignal.set(description);
  }
  
  
  setImageUrl(url: string) {
    this.imageUrlSignal.set(url);
  }


  setShowMobileDescription(state: boolean) {
    this.showMobileDescriptionSignal.set(state);
  }

}
