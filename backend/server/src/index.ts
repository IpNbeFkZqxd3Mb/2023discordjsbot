import * as DiscordBotService from './discordBotService/DiscordBotService';
import * as DeployCommands from './discordBotService/DeployCommands';

const DiscordBotServerRun = async () => {
  try {
    await DeployCommands.deployCommands();
    await DiscordBotService.run();
  } catch (error) {
    throw new Error(error);
  }
};
DiscordBotServerRun();
