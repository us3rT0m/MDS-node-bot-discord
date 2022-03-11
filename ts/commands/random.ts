export { };
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Replies with random number between min and max!')
        .addIntegerOption((option: any) => option.setName('min').setDescription('Set min value').setRequired(true))
        .addIntegerOption((option: any) => option.setName('max').setDescription('Set max value').setRequired(true)),
    async execute(interaction: any) {
        const min = interaction.options.getInteger('min');
        const max = interaction.options.getInteger('max');
        const res = Math.floor(Math.random() * (max - min) + min);
        await interaction.reply(`Random number between ${min} and ${max} : ${res}`);
    },
};