import { Controller } from './controller.model';
import { Router, Request, Response, NextFunction } from 'express';
import { HttpServer } from '../server/httpServer.model';
import { Hero } from '../../../common/models/hero';

const HEROES: Hero[] = [
  { id: 11, name: 'Chromie' },
  { id: 12, name: 'Diablo' },
  { id: 13, name: 'KealTass' },
  { id: 14, name: 'Kerrigan' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Malthael' },
  { id: 20, name: 'Alarak' },
];

// @Controller('/dictionaries') -> adds constructor, with this.router, and this.app
export class HeroController implements Controller {
  private router: Router;

  constructor(private server: HttpServer) {
    this.router = Router();
    this.initialize();
    this.server.addRouter('/heroes', this.router);
  }

  private initialize(): void {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);
  }

  // @Get('/') -> this.router.get()
  private getAll(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({
      message: 'All Heroes',
      heroes: HEROES,
    });
  }

  private getById(req: Request, res: Response, next: NextFunction): void {
    const id = +req.params.id;
    if (id === undefined) {
      next(new Error('Id is not specified'));
    } else {
      Promise.resolve(HEROES
        .find(hero => hero.id === id))
        .then((hero) => {
          if (!hero) {
            res.status(404).json({
              message: 'Hero not found',
            });
          } else {
            res.status(200).json({
              hero,
              message: 'Hero found',
            });
          }
        });
    }
  }
}
