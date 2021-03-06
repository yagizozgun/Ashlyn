const { bot_name } = process.env;
const Command = require("@structures/Command");
const createEmbed = require("@utils/CreateEmbed");

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            group: "music",
            memberName: "stop",
            description: "Stops the current song from playing.",
        });
    };

    run(message) {
        let translations = this.client.getServerLocale(message.guild).COMMANDS.MUSIC;
        let embedTitle = `${bot_name}: ${translations.TITLE}`;

        let queue = this.client.queue;
        let serverQueue = queue.get(message.guild.id);
        let voiceChannel = message.member.voice.channel;

        if (!serverQueue) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NO_SONG
            });

            return message.embed(embed);
        };

        if (voiceChannel !== serverQueue.voiceChannel) {
            let embed = createEmbed({
                title: embedTitle,
                description: translations.NOT_IN_VOICE
            });

            return message.embed(embed);
        };

        serverQueue.songs = [];

        if (serverQueue.connection.dispatcher) serverQueue.connection.dispatcher.end();

        let embed = createEmbed({
            title: embedTitle,
            description: translations.STOPPED
        });

        return message.embed(embed);
    };
};