import { Controller } from './controller.model';
import { Router, Request, Response, NextFunction } from 'express';
import { HttpServer } from '../server/httpServer.model';
import { timetableScrapper } from '../../services/scrapper';
import { htmlParser } from '../../services/html-parser';

// @Controller('/timetable') -> adds constructor, with this.router, and this.app
export class TimetableController implements Controller {
  private router: Router;

  constructor(private server: HttpServer) {
    this.router = Router();
    this.initialize();
    this.server.addRouter('/timetable', this.router);
  }

  private initialize(): void {
    this.router.get('/', this.getAll);
  }
  // @Get('/') -> this.router.get()
  private async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const html = await timetableScrapper.getTimeTable();
    const timetable = htmlParser.getLessons(html.toString());
    res.status(200).json({
      timetable,
      message: 'Here is your timetable :)',
    });
  }
}
