import { Controller } from './controller.model';
import { Router, Request, Response, NextFunction } from 'express';
import { HttpServer } from '../server/httpServer.model';

// @Controller('/dictionaries') -> adds constructor, with this.router, and this.app
export class DictionaryController implements Controller {
  private router: Router;

  constructor(private server: HttpServer) {
    this.router = Router();
    this.initialize();
    this.server.addRouter('/dictionaries', this.router);
  }

  private initialize(): void {
    this.router.get('/', this.getAll);
  }
  // @Get('/') -> this.router.get()
  private getAll(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({
      message: 'PORTALIBRA IS ALIVE!!! FINALLY!',
    });
  }
}
