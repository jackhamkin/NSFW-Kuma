const { Client, Collection, MessageEmbed } = require('discord.js');

module.exports.config = {
	name: "ping",
	aliases: []
}

module.exports.run = async (client, message, args) => {
	message.reply("Pong");
}