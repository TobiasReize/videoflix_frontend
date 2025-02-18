import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  @Input() type: string = '';
  @HostBinding('class.background') isVideoOffer: boolean = false;


  ngOnInit(): void {
    this.isVideoOffer = (this.type === 'video-offer');
  }

}
