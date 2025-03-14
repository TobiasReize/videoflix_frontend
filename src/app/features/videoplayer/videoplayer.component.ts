import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { VideoService } from '../../services/video-service/video.service';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [HeaderComponent, VjsPlayerComponent],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {

  videoService = inject(VideoService);

  setUpOptions = {
    aspectRatio: '16:9',
    autoplay: false,
    controls: false,
    fluid: true,
    muted: true,
    playsinline: true,
    preload: 'auto',
    sources: [
      {
        src: this.videoService.currentVideoUrl(),
        type: 'video/mp4'
      }
    ]
  }

}
