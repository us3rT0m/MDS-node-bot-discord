export { };
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get avatar of mention')
        .addUserOption((option: any) => option.setName('target').setDescription('Select a user').setRequired(true)),
    async execute(interaction: any) {
        const user = interaction.options.getUser('target');
        await interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    },
};