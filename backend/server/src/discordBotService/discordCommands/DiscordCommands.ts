import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import * as DevTest from './DevTest';
import * as User from './User';
import * as Guild from './Guild';
import * as BotInteractions from './BotInteractions';
import { ICOMMAND } from '../../utils/interface/IdiscordBotCommads';

const discordCommandArray: ICOMMAND[] = [
  DevTest.ping,
  User.getUserAvatar,
  User.getUserStatus,
  Guild.status,
  BotInteractions.dice,
];

export const findCommand = (commandName: string): ICOMMAND | null => {
  let res: ICOMMAND = null;
  res = discordCommandArray.find((e) => {
    return e.data.name === commandName;
  });
  return res;
};

export const getAllCommand = (): ICOMMAND[] => {
  return discordCommandArray;
};

export const getAllCommandToDeploy = (): RESTPostAPIChatInputApplicationCommandsJSONBody[] => {
  return discordCommandArray.map((e) => {
    return e.data.toJSON();
  });
};
