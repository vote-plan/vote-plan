import { Component, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(
    private titleService: Title,
    private messageService: MessageService
  ) {
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


}
