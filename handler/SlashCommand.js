const fs = require('fs')
const { Collection } = require('discord.js')
module.exports = client => {
  client.slashCommand = new Collection()
  let mainFolder = fs.readdirSync('./Slash Commands/');
  for (const folder of mainFolder) {
    const files = fs.readdirSync(`./Slash Commands/${folder}/`)
    for (const file of files) {
      const command = require(`../Slash Commands/${folder}/${file}`)
      client['slashCommand'].set(command.name, command)
    }
  }
}
