import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { VideoService } from '../../services/video-service/video.service';
import { ScreenService } from '../../services/screen-service/screen.service';
import { Video } from '../../interfaces/video.interface';
import { VideoGenre } from '../../interfaces/video-genre.interface';
import { ApiService } from '../../services/api-service/api.service';
import { config } from '../../shared/config';

@Component({
  selector: 'app-video-offer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './video-offer.component.html',
  styleUrl: './video-offer.component.scss'
})
export class VideoOfferComponent implements OnInit {

  videoService = inject(VideoService);
  screenService = inject(ScreenService);
  apiService = inject(ApiService);
  router = inject(Router);
  videos: Video[] = [];
  videosByGenre: VideoGenre = {};


  ngOnInit(): void {
    this.apiService.checkCredentials();
    this.apiService.getData(config.VIDEO_URL).subscribe((data: Video[]) => {
      this.videos = data;
      console.log('Videos:', this.videos);
      this.sortVideos();
      this.setInitialVideo();
    });
  }


  sortVideos() {
    this.videosByGenre = {};
    this.videos.forEach((video) => {
      video.genres.forEach((genre) => {
        if (!this.videosByGenre[genre]) {
          this.videosByGenre[genre] = [];
        }
        this.videosByGenre[genre].push(video);
      });
    });
  }


  setInitialVideo() {
    const newVideos = this.videosByGenre['New on Videoflix'];
    const randomIndex = Math.floor(Math.random() * newVideos.length);
    const initialVideo = newVideos[randomIndex];
    this.setVideoChoice(initialVideo);
  }


  setVideoChoice(video: Video) {
    this.videoService.setCurrentVideoTitle(video['title']);
    this.videoService.setCurrentVideoDescription(video['description']);
    this.videoService.setCurrentThumbnail(video['thumbnail']);
    this.videoService.setVideoNameFromPath(video['video_file_url']);
    this.videoService.setCurrentVideoFormat('360p');
    if (this.screenService.isMobile()) {
      this.videoService.setShowMobileDescription(true);
    }
  }


  getGenres(): string[] {
    const genres = Object.keys(this.videosByGenre);
    genres.sort((a, b) => {
      if (a === 'New on Videoflix') return -1;
      if (b === 'New on Videoflix') return 1;
      return a.localeCompare(b);
    });
    return genres;
  }

}
