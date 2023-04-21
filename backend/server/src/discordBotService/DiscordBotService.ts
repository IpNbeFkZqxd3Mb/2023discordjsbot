import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, Events, GatewayIntentBits, Partials } from 'discord.js';
import { config } from 'dotenv';
import * as DiscordEvents from './discordEvents/DiscordEvents';
config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});
//綁定event
DiscordEvents.bindEvent(client);

const run = async () => {
  console.log('正在啟動DiscordBot');
  await client.login(process.env.DISCORD_LOGIN_TOKEN);
};

export { run };
