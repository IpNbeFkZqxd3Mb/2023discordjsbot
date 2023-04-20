import { Events, Webhook, Message, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    let targetChannel;

    if (message.channel.id === process.env.sourceChannelID) {
      targetChannel = await message.client.channels.fetch(process.env.targetChannelID);
    } else if (message.channel.id === targetChannelID) {
      targetChannel = await message.client.channels.fetch(process.env.sourceChannelID);
    } else {
      // 如果不是源頻道或目標頻道中的消息，則不執行任何操作
      return;
    }

    if (!targetChannel) {
      console.error(`找不到目標頻道！`);
      return;
    }

    const content = `**${message.author.tag}** 在 <#${message.channel.id}> 說: \n${message.content}`;

    // 檢查消息中的附件
    const attachments = message.attachments.map((attachment) => {
      return { attachment: attachment.url, name: attachment.name };
    });

    targetChannel.send({ content: content, files: attachments });
  },
};
