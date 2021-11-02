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

	let totalSeconds = client.uptime;
        let days = Math.floor(totalSeconds / 86400000);
        let hours = Math.floor(totalSeconds / 3600000) % 24;
        let minutes = Math.floor(totalSeconds / 60000) % 60;
        let seconds = Math.floor(totalSeconds / 1000) % 60;

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const msg = await message.channel.send('Pinging...');
        await msg.edit(client.embed({

            title: 'PONG!',
            color: "65aaf0",
            description: `**API Latency:** ${client.ws.ping} MS\n\n**Latency:** ${msg.createdAt - message.createdAt} MS\n\n**Uptime:** ${uptime}.`

        }, message));
        
        await msg.edit('');

    },
};

