import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Video } from '../../interfaces/video.interface';

@Component({
  selector: 'app-video-offer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './video-offer.component.html',
  styleUrl: './video-offer.component.scss'
})
export class VideoOfferComponent implements OnInit {

  newVideos: Video[] = [];
  dramaVideos: Video[] = [];
  documentaryVideos: Video[] = [];
  videoGenres = [
    {
      title: 'New on Videoflix',
      genre: 'new',
      videos: this.newVideos
    },
    {
      title: 'Documentary',
      genre: 'documentary',
      videos: this.documentaryVideos
    },
    {
      title: 'Drama',
      genre: 'drama',
      videos: this.dramaVideos
    }
  ];

  videos: Video[] = [
    {
      title: 'Breakout',
      description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.',
      thumbnail: 'img/video-1.png',
      video: '',
      genres: ['new', 'drama']
    },
    {
      title: 'Rythms of Friendship',
      description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.',
      thumbnail: 'img/video-2.png',
      video: '',
      genres: ['drama']
    },
    {
      title: 'Majestic Whales',
      description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.',
      thumbnail: 'img/video-3.png',
      video: '',
      genres: ['new', 'documentary']
    },
    {
      title: 'Whispering SHADOWS',
      description: 'In a high-security prison, a wrongly convicted man formulates a meticulous plan to break out and prove his innocence. He must navigate a web of alliances and betrayals to reclaim his freedom and expose the truth.',
      thumbnail: 'img/video-4.png',
      video: '',
      genres: ['new', 'drama']
    }
  ];


  ngOnInit(): void {
    this.videos.forEach(video => {
      video.genres.forEach(genre => {
        switch (genre) {
          case 'new':
            this.newVideos.push(video);
            break;
          case 'drama':
            this.dramaVideos.push(video);
            break;
          case 'documentary':
            this.documentaryVideos.push(video);
            break;
        }
      })
    })
  }


  showVideo(video: Video) {
    // tbd.
    console.log('video:', video);
  }


}
