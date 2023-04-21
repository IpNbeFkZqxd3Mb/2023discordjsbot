import { SlashCommandBuilder } from 'discord.js';

export interface ICOMMAND {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  execute: Function;
}
