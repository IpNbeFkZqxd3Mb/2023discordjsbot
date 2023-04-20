import { Events, Client, Interaction } from 'discord.js';
import { discordCommandArray } from '../discordCommands/discordCommands';
import { config } from 'dotenv';
config();
const discordEventArray: Array<{
  name: Events | string;
  once: boolean;
  execute: Function;
}> = [
  {
    //event ClientReady
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
      console.log(`Ready! Logged in as ${client.user.tag}`);
    },
  },
  {
    //event InteractionCreate
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
      if (!interaction.isChatInputCommand()) return;
      const command = discordCommandArray.find((e) => {
        return e.data.name === interaction.commandName;
      });

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
  },
  {
    name: 'messageCreate',
    once: false,
    async execute(message) {
      if (message.author.bot) return;

      let targetChannel;

      if (message.channel.id === process.env.sourceChannelID) {
        targetChannel = await message.client.channels.fetch(process.env.targetChannelID);
      } else if (message.channel.id === process.env.targetChannelID) {
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
  },
];
export { discordEventArray };
