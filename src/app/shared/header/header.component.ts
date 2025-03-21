import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  router = inject(Router);


  constructor(private location: Location) { }


  goBack() {
    this.location.back();
  }


  showVideoOffer() {
    this.videoService.setShowMobileDescription(false);
  }


  logout() {
    if (sessionStorage.getItem('remember_me') == 'true') {
      this.router.navigateByUrl('');
    } else {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('token');
      this.router.navigateByUrl('');
    }
  }

}
