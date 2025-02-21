import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Video } from '../../interfaces/video.interface';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../services/video-service/video.service';
import { ScreenService } from '../../services/screen-service/screen.service';

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
  showMobileDescription: boolean = false;

  newVideos: Video[] = [];
  dramaVideos: Video[] = [];
  documentaryVideos: Video[] = [];

  videoGenres = [
    {
      title: 'New on Videoflix',
      genre: 'new',
      videos: this.newVideos
    },
    {
      title: 'Documentary',
      genre: 'documentary',
      videos: this.documentaryVideos
    },
    {
      title: 'Drama',
      genre: 'drama',
      videos: this.dramaVideos
    }
  ];

  videos: Video[] = [
    {
      title: 'Breakout',
      description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.',
      thumbnail: 'img/video-1.png',
      video: '',
      genres: ['new', 'drama']
    },
    {
      title: 'Rythms of Friendship',
      description: 'Test Rythms of Friendship.',
      thumbnail: 'img/video-2.png',
      video: '',
      genres: ['drama']
    },
    {
      title: 'Majestic Whales',
      description: 'Test Majestic Whales.',
      thumbnail: 'img/video-3.png',
      video: '',
      genres: ['new', 'documentary']
    },
    {
      title: 'Whispering SHADOWS',
      description: 'Test Whispering SHADOWS.',
      thumbnail: 'img/video-4.png',
      video: '',
      genres: ['new', 'drama']
    }
  ];


  ngOnInit(): void {
    this.videos.forEach(video => {
      video.genres.forEach(genre => {
        switch (genre) {
          case 'new':
            this.newVideos.push(video);
            break;
          case 'drama':
            this.dramaVideos.push(video);
            break;
          case 'documentary':
            this.documentaryVideos.push(video);
            break;
        }
      });
    });
    this.videoService.setCurrentVideoTitle(this.newVideos[0].title);
    this.videoService.setCurrentVideoDescription(this.newVideos[0].description);
    this.videoService.setImageUrl('url("img/video-preview.png")');
  }


  showVideoDescription(video: Video) {
    // tbd.
    this.videoService.setCurrentVideoTitle(video.title);
    this.videoService.setCurrentVideoDescription(video.description);
    this.videoService.setImageUrl(`url("${video.thumbnail}")`);
    if (this.screenService.isMobile()) {
      this.showMobileDescription = true;
    }
  }


}
