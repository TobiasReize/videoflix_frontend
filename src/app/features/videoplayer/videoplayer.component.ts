import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { VideoService } from '../../services/video-service/video.service';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { ApiService } from '../../services/api-service/api.service';
import { ScreenService } from '../../services/screen-service/screen.service';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [HeaderComponent, VjsPlayerComponent],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit {

  videoService = inject(VideoService);
  toastMsgService = inject(ToastMsgService);
  apiService = inject(ApiService);
  screenService = inject(ScreenService);

  setUpOptions = {
    autoplay: false,
    controls: false,
    fill: true,
    muted: true,
    playsinline: true,
    preload: 'auto',
  }


  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
    this.apiService.checkCredentials();
    this.videoService.setCurrentVideoFormat(this.screenService.getOptimalVideoFormat());
  }

}
