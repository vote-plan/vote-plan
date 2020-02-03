import { Injectable, TemplateRef } from '@angular/core';

/**
 * From https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/message.service.ts
 */
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  toasts: any[] = [];

  constructor() {
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options});
  }

  debug(...value: any) {
    console.log('Debug message:', ...value);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
