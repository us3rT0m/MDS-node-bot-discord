export { };
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rm')
        .setDescription('Bulk remoove n message!')
        .addIntegerOption((option: any) => option.setName('n').setDescription('Set the number of message to be removed (max 100)').setRequired(true)),
    async execute(interaction: any) {
        // await interaction.deferReply({ ephemeral: true });
        let n = interaction.options.getInteger('n');
        if (n > 100) {
            n = 100;
        }
        await interaction.channel.bulkDelete(n).catch(console.error);
        await interaction.reply(`Bulk deleted ${n} messages`);
    },
};
