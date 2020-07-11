const discord = require('discord.js')
const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "ass",
    aliases: []
}

module.exports.run = (client, message, args) => {
    if (message.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
            .query({ type: 'ass' })
            .end((err, response) => {
                const embed = new MessageEmbed()
                    .setColor("#FF6961")
                    .setImage(response.body.message)
                    .setFooter(response.body.message);
                message.channel.send(embed)
            });
    } else {
        message.channel.send("This isn't an NSFW channel!")
    }

}