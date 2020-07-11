const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();

const token = 'NzI5NDQ0NjU0OTczNTgzMzYx.XwJDIw.HqiurFcw_Ut8KiOF-NNOHBMkFV8';

const PREFIX = '.'

const fs = require('fs')
bot.commands = new Collection()
bot.aliases = new Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("I couldn't file commands!");
    }

    jsfile.forEach((file, i) => {
        let pullcmd = require(`./commands/${file}`)
        bot.commands.set(pullcmd.config.name, pullcmd)
        pullcmd.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pullcmd.config.name)
        })
    })
})

bot.on('ready', () => {
    console.log('Kuma is here!')
})

bot.on('message', async message => {

    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if (!message.content.startsWith(PREFIX)) return;
    let commandfile = bot.commands.get(cmd.slice(PREFIX.length)) || bot.commands.get(bot.aliases.get(cmd.slice(PREFIX.length)))
    if (commandfile) commandfile.run(bot, message, args)
}
)

bot.login(token);