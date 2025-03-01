import { Component, ElementRef, HostListener, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  videoProgress: number = 0;
  @ViewChild('videoPlayer', {static: true}) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLElement>;
  @Input() options!: {
    aspectRatio: string,
    autoplay: boolean,
    controls: boolean,
    fluid: boolean,
    muted: boolean,
    playsinline: boolean,
    preload: string,
    sources: {
        src: string,
        type: string,
    }[],
  };


  @HostListener('document:fullscreenchange')
  onFullScreenChange() {
    this.isFullscreen = Boolean(document.fullscreenElement);
  }


  ngOnInit(): void {
    this.player = videojs(this.videoPlayer.nativeElement, this.options, () => {
      // console.log('onPlayerReady', this);

      this.player.volume(0);

      this.player.on('timeupdate', () => {
        this.videoProgress = ((this.player.currentTime() ?? 0) / (this.player.duration() ?? 0)) * 100;
        this.videoDuration = this.formatTime(this.player.remainingTime());
      });

      this.player.on('volumechange', () => this.getVolumeIcon());
      
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
  }


  rewind() {
    if (this.player.currentTime()) {
      const newTime = (this.player.currentTime() ?? 0) - 10;
      this.player.currentTime(newTime);
    }
  }


  getVolumeIcon() {
    const vol = this.player.volume() ?? 0;
    if (this.player.muted() || vol == 0) {
      return 'vjs-icon-volume-mute';
    } else if (vol < 0.25) {
      return 'vjs-icon-volume-low';
    } else if (vol < 0.75) {
      return 'vjs-icon-volume-mid';
    } else {
      return 'vjs-icon-volume-high';
    }
  }


  toggleMute() {
    if (this.player) {
      const isMuted = this.player.muted();
      if (isMuted) {
        this.player.volume(0.5);
        this.player.muted(false);
      } else {
        this.player.volume(0);
        this.player.muted(true);
      }
    }
  }


  setVolume(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const value = (Number(input) / 100);
    this.player.muted(false);
    this.player.volume(value);
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


  setVideoProgress(event: MouseEvent) {
    console.log('event:', event);
    const bar = this.progressBar.nativeElement;
    const rect = bar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * (this.player.duration() ?? 0);
    this.player.currentTime(newTime);
  }


  formatTime(seconds: number) {
    const totalSeconds = seconds > 0 ? Math.ceil(seconds) : 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:` + `${minutes.toString().padStart(2, "0")}:` + `${secs.toString().padStart(2, "0")}`;
  }

}
