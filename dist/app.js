"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require the fs to read filename
const fs = require('node:fs');
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');
// Create a new client instance
const client = new Client({ intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ] });
// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});
client.commands = new Collection();
const commandFiles = fs.readdirSync('./dist/commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}
// Listen to interactions
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        yield command.execute(interaction);
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    }
    catch (error) {
        console.error(error);
        yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
}));
client.on('guildUpdate', (oldGuild, newGuild) => __awaiter(void 0, void 0, void 0, function* () {
    if (oldGuild.name != newGuild.name) {
        client.channels.cache.get('951394992088309783').send(`Server name : ${oldGuild.name} changed to ${newGuild.name}`);
    }
    // console.log('server updated');
}));
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    // Ignore if author is bot
    if (message.author.bot)
        return;
    if (message.content.toLowerCase() === 'hello') {
        message.reply("Hey! What's Up?");
    }
    if (message.content.toLowerCase().includes('bot')) {
        message.reply("Are you talking about me ?");
    }
    if (message.content.length > 3 && message.content === message.content.toUpperCase()) {
        message.reply(`${message.author} **WE ARE NOT DEAF**`);
    }
    if (message.content.includes(client.user.id)) {
        message.reply(`Huh.. Pls don't talk behind my back. Use '/' commands if you want to interact with me!`);
    }
}));
// Login to Discord with your client's token
client.login(token);
