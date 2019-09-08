import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getHomeTitleText() {
    return element(by.css('app-root main.container app-home h2')).getText() as Promise<string>;
  }
}
