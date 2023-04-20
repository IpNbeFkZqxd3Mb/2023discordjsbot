import { getVoiceConnection } from '@discordjs/voice';
import { Events, Client, Interaction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { config } from 'dotenv';
const discordCommandArray: Array<{
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: Function;
}> = [
  {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
      await interaction.reply('Pong!');
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('kick-vc')
      .setDescription('Select a member and kick them (but not really).')
      .addUserOption((option) => option.setName('target').setDescription('The member to kick').setRequired(true)),
    async execute(interaction) {
      const member = interaction.options.getMember('target');
      return interaction.reply({ content: `You wanted to kick: ${member.user.username}`, ephemeral: true });
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('avatar')
      .setDescription('取得目標使用者或自己的頭貼')
      .addUserOption((option) => option.setName('target').setDescription('展示此用戶的頭貼')),
    async execute(interaction) {
      const user = interaction.options.getUser('target');
      if (user) return interaction.reply(`${user.username}的頭貼: ${user.displayAvatarURL({ dynamic: true })}`);
      return interaction.reply(`你的頭貼: ${interaction.user.displayAvatarURL()}`);
    },
  },
  {
    data: new SlashCommandBuilder().setName('dice').setDescription('骰骰子'),
    async execute(interaction) {
      const final = Math.floor(Math.random() * (6 - 1)) + 1;
      const diceEmbed = new EmbedBuilder().setTitle(`🎲 你得到了 ${final} `).setColor('#5865F2');
      interaction.reply({ embeds: [diceEmbed] });
    },
  },
  {
    data: new SlashCommandBuilder().setName('server').setDescription('Provides information about the server.'),
    async execute(interaction) {
      // interaction.guild is the object representing the Guild in which the command was run

      const serverEmbed = new EmbedBuilder()
        .setTitle(`伺服器名稱 : ${interaction.guild.name}`)
        .setColor('#5865F2')
        .setAuthor({ name: `<@!${interaction.guild.ownerId}>`, iconURL: 'https://i.imgur.com/AfFp7pu.png' })
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields({ name: '伺服器成員數', value: `${interaction.guild.memberCount}` });

      await interaction.reply({ embeds: [serverEmbed] });
    },
  },
  {
    data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),
    async execute(interaction) {
      // interaction.user is the object representing the User who ran the command
      // interaction.member is the GuildMember object, which represents the user in the specific guild
      await interaction.reply(
        `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
      );
    },
  },
  //   {
  //     data: new SlashCommandBuilder().setName('joinvc').setDescription('讓機器人加入語音頻道。'),
  //     async execute(interaction) {
  //       if (!interaction.member.voice.channel) {
  //         return interaction.reply({ content: '你必須加入語音頻道才能使用此指令', ephemeral: true });
  //       }

  //       const connection = await getVoiceConnection(interaction.member.voice.channel.join());

  //       await interaction.reply({ content: `已加入 \`${ThreadChannel.name}\` 頻道。`, ephemeral: true });

  //       // Leave the voice channel after 5 minutes
  //       setTimeout(() => {
  //         if (connection && connection.state.status !== ThreadChannel.destroyed) {
  //           connection.destroy();
  //         }
  //       }, 5 * 60 * 1000);
  //     },
  //   },
];
export { discordCommandArray };
