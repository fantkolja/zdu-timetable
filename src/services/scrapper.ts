import axios from 'axios';
import { decode, encode } from 'iconv-lite';
import { stringify } from 'querystring';

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

  public getTimeTable(): void {
    axios.post('https://dekanat.zu.edu.ua/cgi-bin/timetable.cgi?n=700', stringify({
      n: '700',
      faculty: '1004',
      teacher: encode('Фант Микола Олександрович', 'win1251'),
      group: '',
      sdate: '',
      edate: '',
    }), { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(data => console.log(decode(data, 'win1251')));
  }
}

const timetableScrapper = new TimetableScrapper(endpoint);

export { timetableScrapper };
