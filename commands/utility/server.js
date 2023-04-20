const { SlashCommandBuilder , EmbedBuilder  } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run

    const serverEmbed = new EmbedBuilder()
            .setTitle ( `伺服器名稱 : ${interaction.guild.name}` )
            .setColor("#5865F2")
            .setAuthor({ name: `<@!${interaction.guild.ownerId}>` , iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
              { name: '伺服器成員數', value: `${interaction.guild.memberCount}` },
            )

		await interaction.reply(
      { embeds: [serverEmbed] ,}
    )
  },
};
