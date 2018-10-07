import { ApiServer } from './api/server';
import { DictionaryController } from './api/controllers/DictionaryController';
import * as path from 'path';
import * as express from 'express';
import { HeroController } from './api/controllers/HeroController';

const port: number = Number(process.env.API_PORT);
const server: ApiServer = new ApiServer(port);

const staticRoot = path.join(__dirname, '../frontend/dist/frontend');
const staticMiddleware: express.Handler = express.static(`${staticRoot}`);

// app.use(logger('dev'));
// TODO: INTERCEPT all /api calls
server.addControllers([DictionaryController, HeroController]);
server.addMiddleware(staticMiddleware);
server.get('/*', (req, res) => {
  res.status(200).sendFile(`${staticRoot}/index.html`);
});
// TODO: useExpressServer(app, { // register created express server in routing-controllers
//   controllers: [UserController] // and configure it the way you need (controllers, validation, etc.)
// });

// addErrorHandler -> should be after other middleware
// let's do inner checks for that
// e.g. app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)
// catch-all handler, the last one
//   function errorHandler (err, req, res, next) {
//    res.status(500)
//    res.render('error', { error: err })
//   }
server.start();
