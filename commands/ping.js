const Client = require('../structures/Client');
const {MessageEmbed} = require('discord.js');


module.exports = {

    name: 'ping',

    /**
     * @param {Client} client  
     * @param {Message} message
     * @param {String[]} args 
     */

    run: async(client, message, args) => {

        const msg = await message.channel.send('Pinging...');
        await msg.edit(client.embed({

            title: 'PONG!',
            color: "36b9ec",
            description: `**WebSocket Latency:** ${client.ws.ping} MS\n**Message Edit Latency:** ${msg.createdAt - message.createdAt} MS\n**Uptime:** ${client.uptime} miliseconds.`

        }, message));
        
        await msg.edit('');

    },
};