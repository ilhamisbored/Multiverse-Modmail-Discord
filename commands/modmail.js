const Client = require('../structures/Client');
const { Message, PermissionOverwrites } = require('discord.js');

module.exports = {

    name: 'modmail',

    /**
    * @param {Client} client
    * @param {Message} Message
    * @param {String[]} args
    */

    run: async(client, message, args) => {

        if (client.threads.has(`${message.author.id}`)) 
        return message.channel.send("You already have a ticket!");

        const Channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase().includes("modmail"));

        if (!Channel) 
        return message.channel.send("There's no modmail channel!");

        const Messages = [];

        const newChannel = await  message.guild.channels.create(`modmail-${message.author.id}`, {

            type: 'text',
            parent: client.category,
            PermissionOverwrites: 
            [
                {

                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']

                },
                {

                    id: client.role,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES"]

                },
                {

                    id: message.author.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "ATTACH_FILES"]

                },
            ]

            },
        );

        Channel.send(client.embed({

            color: "36b9ec",
            description: `The member ${message.author.tag} (ID: ${message.author.id}) is creating a modmail ticket. Created in ${newChannel}.`

                }, message
            ),
        );

            client.threads.set(message.author.id, {
                channel: newChannel
            },
        );

        const ChannelCollector = newChannel.createMessageCollector((msg) => msg.channel.id == newChannel.id);
        const DMCollector = await message.author.send("**This is the beginning of your conversation**").then(async(msg) => await msg.channel.createMessageCollector((msg) => msg.author.id == message.author.id));
           

        ChannelCollector.on('collect', async(m) => {

            if (m.author.bot)
            return;

            if (m.content.toLowerCase() == `${client.prefix}close`) 
            return ChannelCollector.stop("Closed");


            Messages.push(`[Support] **${m.member.displayName}:** ${m.content}`)

            message.author.send(`**${m.member.displayName}:** ${m.content}`)


            },
        );

        DMCollector.on('collect', async(m) => {

            if (m.author.bot)
            return;

            if (m.content.toLowerCase() == `${client.prefix}close`) 
            return message.author.send(`You can't use this command!`)

            newChannel.send(`**${m.author.username}:** ${m.content}`)

            Messages.push(`**${m.author.username}:** ${m.content}`)

            },
        );

        ChannelCollector.on('end', async(collected, reason) => {

            if (reason == "Closed") {

                DMCollector.stop();

                newChannel.send("Generating transcript...");
                message.author.send("This ticket has been closed.");

                await client.fs.writeFileSync(`../transcript.txt`, Messages.join("\n"));
                newChannel.send(new client.discord.MessageAttachment(client.fs.createReadStream(`../transcript.txt`)));
                return client.threads.delete(message.author.id);

                };
            },
        );
    },
};