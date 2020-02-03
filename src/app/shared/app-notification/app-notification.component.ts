import { Component, OnInit, TemplateRef } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.css']
})
export class AppNotificationComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
