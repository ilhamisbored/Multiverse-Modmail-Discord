const Client = require('../structures/Client');
const { MessageEmbed } = require('discord.js');


module.exports = {

    name: "reload",

    /**
     * @param {Client} client  
     * @param {Message} message
     * @param {String[]} args 
     */

    run: async(client, message, args) => {

        if (message.author.id !== "464847554752938004") {

        return message.channel.send('You cannot use this command!')

        }

        await message.channel.send('Reloading myself...\n\n\n\nTurning on......\n\n\n\n\nMultiverse Modmail has logged in!')
        
        message.delete()
        process.exit();

    },
};