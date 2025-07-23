import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { VideoService } from '../../services/video-service/video.service';
import { ApiService } from '../../services/api-service/api.service';
import { environment } from '../../../environments/environment';

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
  apiService = inject(ApiService);
  router = inject(Router);


  constructor(private location: Location) { }


  goBack() {
    this.location.back();
  }


  showVideoOffer() {
    this.videoService.setShowMobileDescription(false);
  }


  logout() {
    sessionStorage.removeItem('remember_me');
    this.apiService.postData(environment.config.LOGOUT_URL, {}).subscribe({
      error: err => console.log('Error occured: ', err)
    });
    this.router.navigateByUrl('');
  }

}
