import { Component, inject, Input } from '@angular/core';
import { ToastErrorService } from '../../services/toast-error-service/toast-error.service';

@Component({
  selector: 'app-toast-msg',
  standalone: true,
  imports: [],
  templateUrl: './toast-msg.component.html',
  styleUrl: './toast-msg.component.scss'
})
export class ToastMsgComponent {

  toastErrorSerivce = inject(ToastErrorService);
  @Input() msg: string = '';
  @Input() state: 'error' | 'ok' | null = null;


  removeToastError() {
    this.toastErrorSerivce.resetToastError();
  }

}
