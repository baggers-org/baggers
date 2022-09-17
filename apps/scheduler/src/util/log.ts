export class Logger {
  private tag: string;
  constructor(tag: string) {
    this.tag = tag;
  }

  log(...msg: any[]) {
    console.log(this.tag, ...msg);
  }
}
