import { Client, Events, Message, Channel, DMChannel, TextChannel, CategoryChannel } from 'discord.js';
import { IEVENT } from '../../utils/interface/IdiscordBotEvent';

const getCrossServerTalkList = async (): Promise<string[]> => {
  //模擬抓取資料庫
  //1098868064327573514 xiaozou個人頻道
  //907925823523262526 ohayou bottest
  return ['1098868064327573514', '907925823523262526'];
};

export const messageCreate: IEVENT = {
  name: Events.MessageCreate,
  once: false,
  async execute(message: Message) {
    if (message.author.bot) return;

    let crossServerTalkList = await getCrossServerTalkList();
    if (!crossServerTalkList.includes(message.channel.id)) {
      return;
    }
    for (let publishChannelId of crossServerTalkList) {
      const publishChannel: Channel | null = await message.client.channels.fetch(publishChannelId);
      if (!publishChannel || publishChannelId === message.channel.id) {
        continue;
      }
      const content = `**${message.author.tag}** 在 <#${message.channel.id}> 說: \n${message.content}`;
      // "產生"消息中的附件
      const attachments = message.attachments.map((attachment) => {
        return { attachment: attachment.url, name: attachment.name };
      });
      if (publishChannel.isTextBased()) {
        publishChannel.send({ content: content, files: attachments });
      }
    }
  },
};
