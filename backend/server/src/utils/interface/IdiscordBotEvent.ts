import { Events } from 'discord.js';

export interface IEVENT {
  name: Events | string;
  once: boolean;
  execute: Function;
}
