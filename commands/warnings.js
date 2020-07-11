const { Client, Collection, MessageEmbed } = require('discord.js');
const db = require("quick.db")

module.exports.config = {
    name: "warnings",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const user = message.mentions.members.first() || message.author


    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)


    if (warnings === null) warnings = 0;


    message.channel.send(`${user} has **${warnings}** warning(s)`)
}