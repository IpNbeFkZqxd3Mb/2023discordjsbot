import { Client, Events, Interaction } from 'discord.js';
import { IEVENT } from '../../utils/interface/IdiscordBotEvent';
import * as DiscordCommands from '../discordCommands/DiscordCommands';
export const interactionCreate: IEVENT = {
  //event InteractionCreate
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = DiscordCommands.findCommand(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
