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
  @ViewChild('target', {static: true}) target!: ElementRef<HTMLVideoElement>;
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
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
      
      this.on('ended', function() {
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
      const isFullscreen = this.player.isFullscreen();
      isFullscreen ? this.player.exitFullscreen() : this.player.requestFullscreen();
    }
  }

}
