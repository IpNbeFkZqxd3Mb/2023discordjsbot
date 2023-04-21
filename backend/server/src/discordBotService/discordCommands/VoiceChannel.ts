import {
  getVoiceConnection,
  joinVoiceChannel,
  CreateVoiceConnectionOptions,
  JoinVoiceChannelOptions,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { Guild, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();
export const kickVC = {
  data: new SlashCommandBuilder()
    .setName('kick-vc')
    .setDescription('Select a member and kick them (but not really).')
    .addUserOption((option) => option.setName('kick-target').setDescription('The member to kick').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const kickUser = interaction.options.getMember('kick-target') as GuildMember;
    return interaction.reply({ content: `You wanted to kick: ${kickUser.user.username}` /*, ephemeral: true*/ });
  },
};
export const joinVC = {
  data: new SlashCommandBuilder().setName('joinvc').setDescription('讓機器人加入語音頻道。'),
  async execute(interaction: ChatInputCommandInteraction) {
    let member = interaction.member as GuildMember;
    console.log(member.voice);
    if (!member.voice.channel) {
      return interaction.reply({ content: '你必須加入語音頻道才能使用此指令' /*, ephemeral: true*/ });
    }
    const joinVoiceChannelOptions: JoinVoiceChannelOptions = {
      channelId: member.voice.channelId,
      guildId: interaction.guildId,
    };
    const createVoiceConnectionOptions: CreateVoiceConnectionOptions = {
      adapterCreator: interaction.guild.voiceAdapterCreator,
    };
    const connection = joinVoiceChannel({ ...joinVoiceChannelOptions, ...createVoiceConnectionOptions });

    await interaction.reply({ content: `已加入 \`${member.voice.channel.name}\` 頻道。` /*, ephemeral: true*/ });

    // Leave the voice channel after 5 minutes
    setTimeout(() => {
      if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
        connection.destroy();
      }
    }, 5 * 60 * 1000);
  },
};
