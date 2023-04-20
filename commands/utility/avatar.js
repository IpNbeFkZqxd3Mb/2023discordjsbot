const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('取得目標使用者或自己的頭貼')
		.addUserOption(option => option.setName('target').setDescription('展示此用戶的頭貼')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) return interaction.reply(`${user.username}的頭貼: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`你的頭貼: ${interaction.user.displayAvatarURL()}`);
	},
};