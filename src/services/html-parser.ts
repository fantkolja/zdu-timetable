import * as cheerio from 'cheerio';

class HtmlParser {
  // takes a date string of the format '14.11.2018'
  private static generateDate(inputDate: string): Date {
    const dateArray = inputDate.trim().split('.');
    const dateMonth = dateArray.splice(0, 2);
    const normalizedDateString = [...dateMonth.reverse(), ...dateArray].join('.');
    return new Date(normalizedDateString);
  }

  constructor(private cheerio: CheerioAPI) {
  }

  public parseChosenPeriod(html: string): object {
    debugger;
    const $ = this.cheerio.load(html);
    return $('.container>.row>.col-md-6')
      .toArray()
      .map((el) => {
        const dateString = $(el).find('h4').contents().first().text();
        const date = HtmlParser.generateDate(dateString);
        const lessonsEls = $(el).find('tr');
        const lessons = this.parseLessons(lessonsEls, $);
        return {
          date,
          lessons,
        };
      });
  }

  private parseLessons(lessonsEls: Cheerio, $: CheerioStatic): object {
    return lessonsEls
      .toArray()
      .reduce((lessons, el) => {
        const contents = $(el).contents();
        const subject = contents.last().text();
        if (subject) {
          lessons.push({
            subject,
            orderNumber: contents.first().text(),
          });
        }
        return lessons;
      }, []);
  }
}

const htmlParser = new HtmlParser(cheerio);

export { htmlParser };
