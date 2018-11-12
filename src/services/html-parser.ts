import * as cheerio from 'cheerio';

class HtmlParser {
  constructor(private cheerio: CheerioAPI) {
  }

  public getLessons(html: string): void {
    debugger;
    const $ = this.cheerio.load(html);
    const workingDays = $('table');

    console.log(workingDays);
  }
}

const htmlParser = new HtmlParser(cheerio);

export { htmlParser };
