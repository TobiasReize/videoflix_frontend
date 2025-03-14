import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../../interfaces/video.interface';
import { config } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private http = inject(HttpClient);
  private backgroundStyle: string = 'linear-gradient(rgba(20, 20, 20, 0.6), rgba(20, 20, 20, 0), rgba(20, 20, 20, 1.0))';

  private currentVideoTitleSignal = signal<string>('');
  readonly currentVideoTitle = this.currentVideoTitleSignal.asReadonly();

  private currentVideoDescriptionSignal = signal<string>('');
  readonly currentVideoDescription = this.currentVideoDescriptionSignal.asReadonly();

  private currentThumbnailSignal = signal<string>('');
  readonly currentThumbnail = this.currentThumbnailSignal.asReadonly();

  private currentVideoNameSignal = signal<string>('');
  readonly currentVideoName = this.currentVideoNameSignal.asReadonly();

  readonly currentVideoUrl = computed<string>(() => config.MEDIA_VIDEO_URL + this.currentVideoName() + '.mp4');

  readonly currentVideoPreview = computed<string>(() => `${this.backgroundStyle}, url("${this.currentThumbnail()}")`);

  private showMobileDescriptionSignal = signal<boolean>(false);
  readonly showMobileDescription = this.showMobileDescriptionSignal.asReadonly();


  constructor() { }


  setCurrentVideoTitle(title: string) {
    this.currentVideoTitleSignal.set(title);
  }
  
  
  setCurrentVideoDescription(description: string) {
    this.currentVideoDescriptionSignal.set(description);
  }
  
  
  setCurrentThumbnail(url: string) {
    this.currentThumbnailSignal.set(url);
  }


  setCurrentVideoName(name: string) {
    this.currentVideoNameSignal.set(name);
  }


  setShowMobileDescription(state: boolean) {
    this.showMobileDescriptionSignal.set(state);
  }


  // Hilfsfunktionen:
  setVideoNameFromPath(video_file_url: string) {
    this.setCurrentVideoName(this.getVideoName(video_file_url));
  }


  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(config.VIDEO_URL);
  }


  getVideoName(video_file_url: string): string {
    const prefix = '/media/videos/';
    const suffix = '.mp4';
    return video_file_url.slice(prefix.length, -suffix.length);
  }

}
