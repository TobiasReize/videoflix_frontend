import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { VideoService } from '../../services/video-service/video.service';
import { ToastMsgComponent } from "../../shared/toast-msg/toast-msg.component";
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [HeaderComponent, VjsPlayerComponent, ToastMsgComponent],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit {

  videoService = inject(VideoService);
  toastMsgService = inject(ToastMsgService);

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


  ngOnInit(): void {
    this.toastMsgService.resetToastMsg();
  }

}
