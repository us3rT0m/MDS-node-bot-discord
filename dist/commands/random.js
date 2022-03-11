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
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Replies with random number between min and max!')
        .addIntegerOption((option) => option.setName('min').setDescription('Set min value').setRequired(true))
        .addIntegerOption((option) => option.setName('max').setDescription('Set max value').setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const min = interaction.options.getInteger('min');
            const max = interaction.options.getInteger('max');
            const res = Math.floor(Math.random() * (max - min) + min);
            yield interaction.reply(`Random number between ${min} and ${max} : ${res}`);
        });
    },
};
