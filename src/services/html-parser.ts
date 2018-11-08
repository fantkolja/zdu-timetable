import * as cheerio from 'cheerio';

class HtmlParser {
  constructor(private cheerio: CheerioAPI) {
  }

  public getLessons(html: string): void {
    const $ = this.cheerio.load(html);
    const text = $('td').text();
    console.log(text);
  }
}

const htmlParser = new HtmlParser(cheerio);

export { htmlParser };
