import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../../interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private http = inject(HttpClient);
  private apiUrl: string = 'http://127.0.0.1:8000/api/videos/';
  private backgroundStyle: string = 'linear-gradient(rgba(20, 20, 20, 0.6), rgba(20, 20, 20, 0), rgba(20, 20, 20, 1.0))';

  private currentVideoTitleSignal = signal<string>('');
  readonly currentVideoTitle = this.currentVideoTitleSignal.asReadonly();

  private currentVideoDescriptionSignal = signal<string>('');
  readonly currentVideoDescription = this.currentVideoDescriptionSignal.asReadonly();

  private thumbnailSignal = signal<string>('');
  readonly thumbnail = this.thumbnailSignal.asReadonly();

  readonly currentVideoPreview = computed<string>(() => `${this.backgroundStyle}, url("${this.thumbnail()}")`);

  private showMobileDescriptionSignal = signal<boolean>(false);
  readonly showMobileDescription = this.showMobileDescriptionSignal.asReadonly();


  constructor() { }


  setCurrentVideoTitle(title: string) {
    this.currentVideoTitleSignal.set(title);
  }
  
  
  setCurrentVideoDescription(description: string) {
    this.currentVideoDescriptionSignal.set(description);
  }
  
  
  setThumbnail(url: string) {
    this.thumbnailSignal.set(url);
  }


  setShowMobileDescription(state: boolean) {
    this.showMobileDescriptionSignal.set(state);
  }


  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

}
