import { SlashCommandBuilder, Integration, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { ICOMMAND } from '../../utils/interface/IdiscordBotCommads';

export const dice: ICOMMAND = {
  data: new SlashCommandBuilder().setName('dice').setDescription('骰骰子'),
  async execute(interaction: ChatInputCommandInteraction) {
    const final = Math.floor(Math.random() * (6 - 1)) + 1;
    const diceEmbed = new EmbedBuilder().setTitle(`🎲 你得到了 ${final} `).setColor('#5865F2');
    interaction.reply({ embeds: [diceEmbed] });
  },
};
