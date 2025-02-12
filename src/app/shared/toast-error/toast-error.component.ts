import { Component, inject, Input } from '@angular/core';
import { ToastErrorService } from '../../services/toast-error.service';

@Component({
  selector: 'app-toast-error',
  standalone: true,
  imports: [],
  templateUrl: './toast-error.component.html',
  styleUrl: './toast-error.component.scss'
})
export class ToastErrorComponent {

  toastErrorSerivce = inject(ToastErrorService);
  @Input() msg: string = ''


  removeToastError() {
    this.toastErrorSerivce.resetToastError();
  }

}
