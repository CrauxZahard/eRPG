const fs = require('fs')
const SlashCommand = require('../Util/SlashCommand.js')
const { Collection } = require('discord.js')
module.exports = async client => {
  const slash = new SlashCommand(client)
  client.slashCommand = new Collection()
  let overwriteCommandData = []
  let mainFolder = fs.readdirSync('./Slash Commands/');
  for (const folder of mainFolder) {
    const files = fs.readdirSync(`./Slash Commands/${folder}/`)
    for (const file of files) {
      const command = require(`../Slash Commands/${folder}/${file}`)
      overwriteCommandData.push(command)
      client.slashCommand.set(command.name, command)
    }
  }
  const result = await slash.bulkOverwrite(overwriteCommandData)
  return result
}
