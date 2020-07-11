const { Client, Collection, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const bot = new Client();

module.exports.config = {
    name: "warn",
    aliases: []
}

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You should have admin perms to use this command!")
    }

    const user = message.mentions.members.first()

    if (!user) {
        return message.channel.send("Please Mention the person to who you want to warn - warn @mention <reaosn>")
    }

    if (message.mentions.users.first().bot) {
        return message.channel.send("You can not warn bots")
    }

    if (message.author.id === user.id) {
        return message.channel.send("You can not warn yourself")
    }

//    if (user.id === message.guild.owner.id) {
//        return message.channel.send("Can not warn server owner.")
//   }

    const reason = args.slice(1).join(" ")

    if (!reason) {
        const embed = new MessageEmbed()
        return message.channel.send("Please provide reason to warn - warn @mention <reason>")
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    if (warnings === 3) {
        return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`)
    }

    if (warnings === null) {
        db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)

        const embed = new MessageEmbed()
            .setColor("#ff2050")
            .setTitle('User Warned')
            .addField('User:', user, true)
            .addField('Reason:', reason, true)
            .setFooter(`Warned by ${message.author.tag}`);
        await message.channel.send(embed)

    } else if (warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(`You have been warned in **${message.guild.name}** for ${reason}`)

        const embed2 = new MessageEmbed()
            .setColor("#ff2050")
            .setTitle('User Warned')
            .addField('User:', user, true)
            .addField('Reason:', reason, true)
            .setFooter(`Warned by ${message.author.tag}`);
        await message.channel.send(embed2)
    }
}