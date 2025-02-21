import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenService } from './services/screen-service/screen.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix';

  screenService = inject(ScreenService);


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenService.setScreenWidth(window.innerWidth);
  }

}
