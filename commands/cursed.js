const { Client, Collection, MessageEmbed } = require('discord.js');
const randomPuppy = require("random-puppy");

module.exports.config = {
    name: "cursed",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    const subReddits = ["cursedimages"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    
    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setImage(img)
        .setURL(`https://reddit.com/r/${random}`)
        .setFooter(img)

    message.channel.send(embed);
}