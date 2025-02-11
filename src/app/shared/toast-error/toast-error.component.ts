import { Component } from '@angular/core';

@Component({
  selector: 'app-toast-error',
  standalone: true,
  imports: [],
  templateUrl: './toast-error.component.html',
  styleUrl: './toast-error.component.scss'
})
export class ToastErrorComponent {

  msg: string = 'Test Test Test Testtext'

}
