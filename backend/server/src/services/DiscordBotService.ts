/*The fs module is Node's native file system module. 
	fs is used to read the commands directory and identify our command files.
The path module is Node's native path utility module. path helps construct paths to access files and directories. 
	One of the advantages of the path module is that it automatically detects the operating system and uses the appropriate joiners.
The Collection class extends JavaScript's native Map class, and includes more extensive, useful functionality. 
	Collection is used to store and efficiently retrieve commands for execution.
*/
// Require the necessary discord.js classes
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { discordEventArray } from '../discordEvents/discordEvent';
config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
discordEventArray.forEach((eventObject) => {
  if (eventObject.once) {
    client.once(eventObject.name, (...args) => eventObject.execute(...args));
  } else {
    client.on(eventObject.name, (...args) => eventObject.execute(...args));
  }
});

// Log in to Discord with your client's token
const discordBotRun = () => {
  client.login(process.env.DISCORD_LOGIN_TOKEN);
};

export { discordBotRun };
