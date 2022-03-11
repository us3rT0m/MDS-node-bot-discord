export { };
// Require the fs to read filename
const fs = require('node:fs');

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./dist/commands').filter((file: any) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Listen to interactions
client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('message', async (interaction: any) => {
	console.log(interaction);
	console.log(interaction.isMention());
})

// Login to Discord with your client's token
client.login(token);
