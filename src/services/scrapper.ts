import axios from 'axios';
import { decode } from 'iconv-lite';

const endpoint = 'https://dekanat.zu.edu.ua/cgi-bin/timetable.cgi';

class TimetableScrapper {
  private static setupURL(endpoint: string): string {
    const url = new URL(endpoint);
    url.searchParams.set('n', '701');
    url.searchParams.set('faculty', '1004'); // NNIIF
    return url.toString();
  }

  constructor(private endpoint: string) {
  }

  get url(): string {
    return TimetableScrapper.setupURL(this.endpoint);
  }

  // TODO: return Promise
  public getTeacher(name: string): void {
    const url = new URL(this.url);
    url.searchParams.set('query', name);
    url.searchParams.set('lev', '141'); // teachers
    axios.get(url.toString(), { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(data => console.log(decode(data, 'win1251')));
  }

  public getTeachers(): void {
    return this.getTeacher('');
  }

  public getGroups(): void {
    const url = new URL(this.url);
    url.searchParams.set('query', name);
    url.searchParams.set('lev', '142'); // groups
    axios.get(url.toString(), { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(data => console.log(decode(data, 'win1251')));
  }

  // public getTimeTable() {
  //   const url = new URL(this.url);
  //   url.searchParams.set('query', '');
  //   url.searchParams.set('lev', '142'); // teachers
  //   const options = TimetableScrapper.getRequestOptions(url, 'POST');
  //
  //   // const converterStream = decodeStream('win1251');
  //   const req = request(options, (res) => {
  //     // res.pipe(converterStream);
  //     res.on('data', (data) => {
  //       console.log(data);
  //     });
  //   });
  //
  //   req.on('error', (e) => {
  //     console.error(e);
  //   });
  //   // converterStream.on('data', (data) => {
  //   //   console.log(data);
  //   // });
  //   req.end();
  //   'Фант Микола Олександрович'
  // }
}

const timetableScrapper = new TimetableScrapper(endpoint);

export { timetableScrapper };
