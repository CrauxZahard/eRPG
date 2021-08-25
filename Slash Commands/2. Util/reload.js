const fs = require('fs')
const {Collection} = require('discord.js')
module.exports.name = 'reload'
module.exports.description = 'reload a command'
module.exports.options = [{name: 'name',
                          description: 'the command name to reload (\'all\' to reload all commands with that type)',
                          required: true,
                          type: 3}, {
                          name: 'type',
                          description: 'type of interaction (default: slash command)',
                          required: false,
                          type: 3,
                          choices: [{
                             name: 'Slash Command',
                             value: 'slashCommand'
                            }, {
                             name: 'Button',
                             value: 'buttonCommand'
                            }, {
                             name: 'Select Menu',
                             value: 'selectCommand'
                            }]
                          }]

module.exports.run = async (client, passedOptions, interaction) => {
  let choice = passedOptions[1]?.value ?? 'slashCommand'
  const path = choice == 'slashCommand' ? '../Slash Commands/' : choice == 'buttonCommand' ? '../Button Commands/' : '../Select Menus/'
  
  if(passedOptions[0].value == 'all') {
    client[choice].clear()
    client[choice] = new Collection()
    const mainFolder = fs.readdirSync(path)
    for(const folder of mainFolder) {
      const files = fs.readdirSync(`${path}${folder}/`)
      for(const file of files) {
        const command = require(`${path}${folder}/${file}`)
        client[choice].set(command.name, command)
      }
    }
    return interaction.reply('success reloaded command.')
  }
  
  else {
    const deleted = client[choice].delete(passedOptions[0].value)
    if(!deleted) return interaction.reply(`command with name \`${passedOptions[0].value}\` doesn't exist`)
    const mainFolder = fs.readdirSync(path)
    for(const folder of mainFolder) {
      const files = fs.readdirSync(`${path}${folder}/`)
      for(const file of files) {
        const command = require(`${path}${folder}/${file}`)
        if(command.name == passedOptions[0].value) {
          client[choice].set(command.name, command)
          return interaction.reply('success reloaded that command. path: ' + path + folder + '/' + file)
        }
      }
    }
    return interaction.reply(`command with name \`passedOptions[0].value\` not found. it is deleted instead.`)
  }
  
}
