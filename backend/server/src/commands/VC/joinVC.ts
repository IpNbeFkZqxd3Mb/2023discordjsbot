import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

module.exports = {
  data: new SlashCommandBuilder().setName('joinvc').setDescription('讓機器人加入語音頻道。'),
  async execute(interaction) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({ content: '你必須加入語音頻道才能使用此指令', ephemeral: true });
    }

    const connection = await getVoiceConnection(interaction.member.voice.channel.join());

    await interaction.reply({ content: `已加入 \`${ThreadChannel.name}\` 頻道。`, ephemeral: true });

    // Leave the voice channel after 5 minutes
    setTimeout(() => {
      if (connection && connection.state.status !== ThreadChannel.destroyed) {
        connection.destroy();
      }
    }, 5 * 60 * 1000);
  },
};
