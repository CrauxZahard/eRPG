const {Client, Intents} = require('discord.js');
const { token } = require('./token.json');

const client = new Client({ Intents: [ Intents.FLAGS.GUILDS ] });
client.db = require('quick.db');

require('./handler/events.js')(client);

client.login(token);
