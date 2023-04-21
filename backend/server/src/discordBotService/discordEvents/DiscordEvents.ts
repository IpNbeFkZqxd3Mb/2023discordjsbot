import { Events, Client, Interaction } from 'discord.js';
import * as DiscordCommands from '../discordCommands/DiscordCommands';
import * as dotenv from 'dotenv';
import { IEVENT } from '../../utils/interface/IdiscordBotEvent';
import * as BotStatus from './BotStatus';
import * as InteractionCreate from './InteractionCreate';
import * as Message from './Message';
dotenv.config();
const discordEventArray: IEVENT[] = [BotStatus.ready, InteractionCreate.interactionCreate, Message.messageCreate];

export const bindEvent = (client: Client) => {
  discordEventArray.forEach((eventObject) => {
    if (eventObject.once) {
      client.once(eventObject.name, (...args) => eventObject.execute(...args));
    } else {
      client.on(eventObject.name, (...args) => eventObject.execute(...args));
    }
  });
};


