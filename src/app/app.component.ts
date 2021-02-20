import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MessageService} from './main/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  public constructor(
    private titleService: Title,
    private messageService: MessageService
  ) {
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }


}
