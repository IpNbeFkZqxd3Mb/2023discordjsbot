import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { discordCommandArray } from './discordCommands/discordCommands';
config();

const commands = [];
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_LOGIN_TOKEN);
discordCommandArray.forEach((e) => {
  commands.push(e.data.toJSON());
});
// and deploy your commands!
(async () => {
  console.log(commands);
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
    console.log(typeof data);
    //console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
