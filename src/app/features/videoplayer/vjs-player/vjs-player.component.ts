import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  imports: [],
  templateUrl: './vjs-player.component.html',
  styleUrl: './vjs-player.component.scss',
})
export class VjsPlayerComponent implements OnInit, OnDestroy {

  player!: Player;
  @ViewChild('target', {static: true}) target!: ElementRef;
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
    });
  }


  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
