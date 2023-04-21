import { Client, Events } from 'discord.js';
import { IEVENT } from '../../utils/interface/IdiscordBotEvent';
export const ready: IEVENT = {
  //event ClientReady
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
