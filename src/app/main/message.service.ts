import {Injectable, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Toast {
  message: string;
  template: TemplateRef<any> | null;
}

export interface MessageToast {
  toast: Toast;
  options: any;
}


/**
 * From https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/message.service.ts
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  toasts$: Observable<MessageToast[]>;

  constructor() {
  }

  show(toast: Toast, options: any = {}): void {
    this.toasts$ = this.toasts$.pipe(
      map(items => items.concat([{toast, options}]))
    );
  }

  debug(...value: any): void {
    console.log('Debug message:', ...value);
  }

  remove(toast: MessageToast): void {
    this.toasts$ = this.toasts$.pipe(
      map(items => items.filter(t =>
        t.toast !== toast.toast && t.options !== toast.options
      )));
  }
}
