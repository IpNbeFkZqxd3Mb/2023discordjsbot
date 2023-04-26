import { CrossChannel } from '../entities/CrossChannel';
import * as CrossChannelModel from '../models/CrossChannelModel';
export const getAllCrossChannel = async () => {
  return await CrossChannelModel.getMany({});
};
export const save = async (payload: {
  channelId: string;
  channelName: string;
  guildId?: string;
  guildName?: string;
}) => {
  let newChannel: CrossChannel = new CrossChannel();
  newChannel.channelId = payload.channelId;
  newChannel.channelName = payload.channelName;
  newChannel.guildId = payload.guildId;
  newChannel.guildName = payload.guildName;
  return await CrossChannelModel.save(newChannel);
};
