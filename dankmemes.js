const talkedRecently = new Set();
const Discord = require("discord.js");

var bot = new Discord.Client;

var prefix = "-"

bot.on("ready", function(message) {
  console.log("Bedwars bot is ready with: -play");
  bot.user.setPresence({ status: 'dnd', game: { name: '-play & -help', type: 0 } });
});


bot.on("message", (message) => {
  if(message.author.bot) return;

  if(!message.content.startsWith(prefix)) return;
  if (talkedRecently.has(message.author.id)) return;
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "play":
      message.channel.send('@here Does anyone wanna play bedwars with: ' + message.author + '? If so please DM ' + message.author);
      talkedRecently.add(message.author.id);
      setTimeout(() => {
          talkedRecently.delete(message.author.id);
}, 1000 * 60 * 60);
		break;
 case "suggest":
    var embed = new Discord.RichEmbed()
        .addField(message.member.displayName + " has sent in a suggestion:", args.slice(1, args.length).join(' '))
        .setColor(0x3fd53f)
        .setFooter("Like it? 👍 Or 👎")
        .setThumbnail(message.author.avatarURL)
    message.guild.channels.find(x => x.name === "suggestions").sendEmbed(embed);
    message.channel.send(message.author + " Your  suggestion has been sent in. Check it out in #suggestions. This new type of suggestion is still currently in beta so there may be some bugs.")
    break;
  case "members":
    message.channel.send(message.guild.memberCount)
    break;
		default:
			message.channel.send("**That is not a command i recognize, there is currently no help list so please contact UltraPlayz.**");
		break;
	}
});

bot.on("guildMemberAdd", member => {
	const channel = member.guild.channels.find("name", "lobby");

	if (!channel) return;
	channel.send(`**YAY!** ${member} **Has just joined! :)**`);
});

bot.login(process.env.BOT_TOKEN);
