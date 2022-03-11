export { };

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { token, clientId } = require('../config.json');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./dist/commands').filter((file: any) => file.endsWith('.js'));

// Place your guild ids here
// const guildId = '243543253354';

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		// await rest.put(
		// 	Routes.applicationGuildCommands(clientId, guildId),
		// 	{ body: commands },
		// );

        await rest.put(
            Routes.applicationCommands(process.env.clientId),
            { body: commands },
        );
        

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
