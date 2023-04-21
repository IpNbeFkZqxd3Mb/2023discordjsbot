import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ICOMMAND } from '../../utils/interface/IdiscordBotCommads';

export const ping: ICOMMAND = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction: ChatInputCommandInteraction) {
    console.log(interaction);
    await interaction.reply('Pong!');
  },
};
