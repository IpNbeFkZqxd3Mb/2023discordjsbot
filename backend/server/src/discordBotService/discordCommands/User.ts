import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ImageURLOptions,
  GuildMember,
  APIInteractionGuildMember,
} from 'discord.js';
import { ICOMMAND } from '../../utils/interface/IdiscordBotCommads';

export const getUserAvatar: ICOMMAND = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('取得目標使用者或自己的頭貼')
    .addUserOption((option) => option.setName('target').setDescription('展示此用戶的頭貼')),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('target');
    if (user) return interaction.reply(`${user.username}的頭貼: ${user.displayAvatarURL({ forceStatic: false })}`);
    return interaction.reply(`你的頭貼: ${interaction.user.displayAvatarURL()}`);
  },
};

export const getUserStatus = {
  data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),
  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.member;
    let joinedAt: Date | string;
    if (member instanceof GuildMember) {
      joinedAt = member.joinedAt;
    } else {
      joinedAt = member.joined_at;
    }
    await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${joinedAt}.`);
  },
};
