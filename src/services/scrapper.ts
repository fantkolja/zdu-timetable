import { request, RequestOptions } from 'https';
import { decodeStream } from 'iconv-lite';

const endpoint = 'https://dekanat.zu.edu.ua/cgi-bin/timetable.cgi';

class TimetableScrapper {
  private static setupURL(endpoint: string): string {
    const url = new URL(endpoint);
    url.searchParams.set('n', '701');
    url.searchParams.set('lev', '141');
    url.searchParams.set('faculty', '0');
    return url.toString();
  }

  private static getRequestOptions(url: URL, method: string): RequestOptions {
    return {
      method,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
    };
  }

  constructor(private endpoint: string) {
  }

  get url(): string {
    return TimetableScrapper.setupURL(this.endpoint);
  }

  public getTeacher(name: string): void {
    const url = new URL(this.url);
    url.searchParams.set('query', name);
    const options = TimetableScrapper.getRequestOptions(url, 'GET');

    const converterStream = decodeStream('win1251');
    console.log(options);
    const req = request(options, (res) => {
      res.pipe(converterStream);
    });

    req.on('error', (e) => {
      console.error(e);
    });
    converterStream.on('data', (data) => {
      console.log(data);
    });
    req.end();
  }

  public getTeachers(): void {
    return this.getTeacher('');
  }
}

const timetableScrapper = new TimetableScrapper(endpoint);

export { timetableScrapper };
