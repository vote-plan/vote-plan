export class TitleServiceStub {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  getTitle(): string { return this.title; }

  setTitle(value: string): void { this.title = value; }
}
