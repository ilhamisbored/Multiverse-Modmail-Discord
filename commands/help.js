const Client = require('../structures/Client');
const { MessageEmbed } = require('discord.js');


module.exports = {

    name: "help",

    /**
     * @param {Client} client  
     * @param {Message} message
     * @param {String[]} args 
     */

    run: async(client, message, args) => {

        const msg = await message.channel.send('Loading...');
        await msg.edit(client.embed({

            title: 'Here are my commands:',
            color: "36b9ec",
            description: "m.help\nm.ping\nm.modmail (creates a new ticket)",

        }, message));
        
        await msg.edit('');

    },
};