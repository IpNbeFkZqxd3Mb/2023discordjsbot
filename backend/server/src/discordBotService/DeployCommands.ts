import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { config } from 'dotenv';
import * as DiscordCommands from './discordCommands/DiscordCommands';
config();

const deployCommands = async () => {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = DiscordCommands.getAllCommandToDeploy();
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_LOGIN_TOKEN);
  try {
    console.log(`準備上傳 (/)command，數量:${commands.length}`);
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
    console.log(`已上傳${commands.length}個 (/) commands!`);
  } catch (error) {
    console.error(error);
  }
};

export { deployCommands };
