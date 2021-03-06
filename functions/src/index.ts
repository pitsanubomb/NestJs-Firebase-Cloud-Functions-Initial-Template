import * as functions from 'firebase-functions';

// Express
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// NestJs
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './nestApi/app.module';

const server: express.Express = express();
/* Express middleware. */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
/* End of express middleware. */

const startNestApplication = async (expressInstance: express.Express) => {

    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

    await app.init();
};

void startNestApplication(server);

export const api = functions.https.onRequest(server);