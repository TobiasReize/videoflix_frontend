import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { VideoService } from '../../../services/video-service/video.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vjs-player.component.html',
  styleUrl: './vjs-player.component.scss',
})
export class VjsPlayerComponent implements OnInit, OnDestroy {

  videoService = inject(VideoService);
  player!: Player;
  isFullscreen: boolean = false;
  videoDuration: string = "00:00:00";
  @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  @Input() options!: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    controls: boolean,
    sources: {
        src: string,
        type: string,
    }[],
  };


  ngOnInit(): void {
    this.player = videojs(this.videoPlayer.nativeElement, this.options, () => {
      console.log('onPlayerReady', this);

      this.player.on('timeupdate', () => { 
        this.videoDuration = this.formatTime(this.player.remainingTime());
      });
      
      this.player.on('ended', () => {
        videojs.log('Awww...over so soon?!');
      });

    });
  }


  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }


  togglePlay() {
    this.player.paused() ? this.player.play() : this.player.pause();
  }


  fastForward() {
    if (this.player.currentTime()) {
      const newTime = (this.player.currentTime() ?? 0) + 10;
      this.player.currentTime(newTime);
    }
    console.log('currentTime:', this.player.currentTime());
  }


  rewind() {
    if (this.player.currentTime()) {
      const newTime = (this.player.currentTime() ?? 0) - 10;
      this.player.currentTime(newTime);
    }
    console.log('currentTime:', this.player.currentTime());
  }


  toggleMute() {
    if (this.player) {
      const isMuted = this.player.muted();
      this.player.muted(!isMuted);
    }
  }


  toggleFullscreen() {
    if (this.player) {
      const videoWrapper = this.videoContainer.nativeElement;
      if (!document.fullscreenElement) {
        videoWrapper.requestFullscreen();
        this.isFullscreen = true;
      } else {
        document.exitFullscreen();
        this.isFullscreen = false;
      }
    }
  }


  formatTime(seconds: number) {
    seconds = Math.abs(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, "0")}:` + `${minutes.toString().padStart(2, "0")}:` + `${secs.toString().padStart(2, "0")}`;
  }

}
