import { Request, Response, NextFunction } from 'express';
import * as CrossChannelService from '../services/CrossChannelService';
import * as DiscordBotService from '../discordBotService/DiscordBotService';

export const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = { ...req.body };
    console.log(payload);
    const result = await CrossChannelService.save(payload);
    res.json(result);
  } catch (err) {
    res.json(new Error(err));
  }
};

export const getAllCrossChannel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CrossChannelService.getAllCrossChannel();
    res.json(result);
  } catch (err) {
    res.json(new Error(err));
  }
};

export const getAllChannel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const crossChannelList = await CrossChannelService.getAllCrossChannel();
    const result = DiscordBotService.client.channels.cache.filter((channel) => {
      return !crossChannelList.find((crossChannel) => {
        return crossChannel.channelId === channel.id;
      });
    });
    res.json(result);
  } catch (err) {
    res.json(new Error(err));
  }
};
