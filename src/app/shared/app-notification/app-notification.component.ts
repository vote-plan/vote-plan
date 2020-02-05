import { Component, OnInit, TemplateRef } from '@angular/core';
import { MessageService, MessageToast } from '../../message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.css']
})
export class AppNotificationComponent implements OnInit {

  toasts$: Observable<MessageToast[]>;

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.toasts$ = this.messageService.toasts$;
  }

  isTemplate(toast: MessageToast): boolean {
    return toast.toast.template instanceof TemplateRef;
  }

  removeToast(toast: MessageToast) {
    this.messageService.remove(toast);
  }
}
