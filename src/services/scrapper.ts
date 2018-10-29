import { request } from 'https';
import { decodeStream } from 'iconv-lite';

console.log('requesting zdu timetable');

const hostname = 'dekanat.zu.edu.ua';

class TimetableScrapper {
  constructor(private hostname: string) {
  }

  public getTeachers(): void {
    const options = {
      hostname: this.hostname,
      path: `/cgi-bin/timetable.cgi?n=701&lev=141&faculty=0&query=${encodeURIComponent('Фант')}`,
      method: 'GET',
    };

    const converterStream = decodeStream('win1251');
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
}

const timetableScrapper = new TimetableScrapper(hostname);

export { timetableScrapper };
