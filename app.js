// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity('\u200D');
  
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  var txt = message.content.split(' ');
  for(i = 0; i < txt.length; i++){
    var item = txt[i];
    var bool = false;
    var url;
    if(item.size > 3 && (item.indexOf("/r/") == 0 || item.indexOf("/u/") == 0)){
      bool = true;
      url = "https://www.reddit.com" + item;
    }
    else if(item.size > 3 && (item.indexOf("r/") == 0 || item.indexOf("u/") == 0)){
      bool = true;
      url = "https://www.reddit.com/" + item;
    }
    if(bool){
      message.reply("Sorry to interrupt, but I noticed you mentioned a subreddit or Reddit user. Here's the link below. **If you want this to stop, please remove the bot from the server, or ask the admins to do so.** \n" + url);
    }
  }
});

client.login(config.token);
