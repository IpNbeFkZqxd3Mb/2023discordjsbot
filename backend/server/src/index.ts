import * as DiscordBotService from './discordBotService/DiscordBotService';
import * as DeployCommands from './discordBotService/DeployCommands';
import { Database } from './config/database';
import { AppRoutes } from './routes';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
const app = express();
app.use(cors());
app.use(cookieParser(process.env.SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.APP_PORT;
AppRoutes.forEach((route) => {
  app[route.method](route.path, ...route.middlewares);
});

const DiscordBotServerRun = async () => {
  try {
    await Database.initialize()
      .then(() => {
        console.log('已連接資料庫');
      })
      .catch((err) => {
        console.log(err);
      });
    await DeployCommands.deployCommands();
    await DiscordBotService.run();
    http.createServer(app).listen(PORT, () => {
      console.log('Listening on port: ' + PORT + '.');
    });
  } catch (error) {
    throw new Error(error);
  }
};
DiscordBotServerRun();
