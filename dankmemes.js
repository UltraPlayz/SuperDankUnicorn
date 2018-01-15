const Discord = require("discord.js");

var bot = new Discord.Client;

var prefix = "/"

bot.on("ready", function(message) {
  console.log("DankMemes loading...");
  bot.user.setPresence({ status: 'online', game: { name: '/help', type: 0 } });
});

bot.on("message", (message) => {
	if(message.author.bot) return;

	if(!message.content.startsWith(prefix)) return;
	var args = message.content.substring(prefix.length).split(" ");

	switch (args[0].toLowerCase()) {
		case "verify":
			var unverified1 = message.guild.roles.find(x => x.name === 'Unverified');
			var memberRole = message.guild.roles.find(x => x.name === 'Member');

			if(!message.member.roles.find('name', 'Unverified')) {
				message.channel.send("You already verified silly :)");
			} else {
				message.reply("You are verified, you now have full access to discord!");
				message.member.addRole(memberRole);
				message.member.removeRole(unverified1);
			}
		break;
		case "help":
			var embed = new Discord.RichEmbed()
				.setTitle("Here is the help list for `SuperDankUnicorn`")
				.addField("General Fun Commands:", "**/meme help** Shows this help list.")
				.addField("Error", "Failed to load up commands. More commands coming soon.")
				.setColor(0x3fd53f)
				.setFooter("Thanks for using SuperDankUnicorn!")
		break;
		default:
			message.channel.send("**That is not a command i recognize please type /meme help for a list of commands.**");
		break;
	}
});

bot.on("guildMemberAdd", member => {
	const joinChannel = member.guild.channels.find("name", "welcome");
	var unverified = member.guild.roles.find(x => x.name === 'Unverified')
	const verify = member.guild.channels.find("name", "verification");

	if (!joinChannel) return;
	joinChannel.send(`${member} *walks out of a spaceship*, **YAY your here!**`)
	verify.send(`${member} **Please verfiy your account by typing  /verify**`)
	member.addRole(unverified);
});

bot.login(process.env.BOT_TOKEN);
