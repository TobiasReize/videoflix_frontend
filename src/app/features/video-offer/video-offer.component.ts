import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { VideoService } from '../../services/video-service/video.service';
import { ScreenService } from '../../services/screen-service/screen.service';
import { Video } from '../../interfaces/video.interface';
import { VideoGenre } from '../../interfaces/video-genre.interface';

@Component({
  selector: 'app-video-offer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './video-offer.component.html',
  styleUrl: './video-offer.component.scss'
})
export class VideoOfferComponent implements OnInit {

  videoService = inject(VideoService);
  screenService = inject(ScreenService);
  videos: Video[] = [];
  videosByGenre: VideoGenre = {};


  ngOnInit(): void {
    this.videoService.getVideos().subscribe((data: Video[]) => {
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
    console.log('videosByGenre:', this.videosByGenre);
  }


  setInitialVideo() {
    const newVideos = this.videosByGenre['New on Videoflix'];
    const randomIndex = Math.floor(Math.random() * newVideos.length);
    const initialVideo = newVideos[randomIndex];
    this.videoService.setCurrentVideoTitle(initialVideo['title']);
    this.videoService.setCurrentVideoDescription(initialVideo['description']);
    this.videoService.setThumbnail(initialVideo['thumbnail']);
  }


  showVideoDescription(video: Video) {
    this.videoService.setCurrentVideoTitle(video.title);
    this.videoService.setCurrentVideoDescription(video.description);
    this.videoService.setThumbnail(video.thumbnail);
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
