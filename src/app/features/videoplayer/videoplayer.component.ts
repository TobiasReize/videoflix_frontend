import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [HeaderComponent, VjsPlayerComponent],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {

}
