import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getLeadText(): Promise<string> {
    return element(by.css('p.lead')).getText();
  }
}
