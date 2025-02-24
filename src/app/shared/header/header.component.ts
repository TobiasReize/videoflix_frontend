import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../services/video-service/video.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() type: string = '';
  videoService = inject(VideoService);


  constructor(private location: Location) { }


  goBack() {
    this.location.back();
  }


  showVideoOffer() {
    this.videoService.setShowMobileDescription(false);
  }

}
