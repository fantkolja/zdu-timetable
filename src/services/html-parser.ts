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
    const workingDaysEls = $('.container>.row>.col-md-6');
    const workingDays = [];
    workingDaysEls.each((i, el) => {
      const dateString = $(el).find('h4').contents()[0].data;
      const date = HtmlParser.generateDate(dateString);
      const lessons = this.parseLessons($(el).find('tr'));
      workingDays[i] = {
        date,
        lessons,
      };
    });
    return workingDays;
  }

  private parseLessons(lessonsEls: Cheerio): object {
    const lessons = [];
    lessonsEls.each((i, el) => {
      const lessonEntry = el.children;
      lessons[i] = {
        orderNumber: lessonEntry[0],
        subject: lessonEntry[2],
      };
    });
    return lessons;
  }
}

const htmlParser = new HtmlParser(cheerio);

export { htmlParser };
