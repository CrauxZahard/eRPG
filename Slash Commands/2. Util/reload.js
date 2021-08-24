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
                             value: 'slash'
                            }, {
                             name: 'Button',
                             value: 'button'
                            }, {
                             name: 'Select Menu',
                             value: 'select'
                            }]
                          }]

module.exports.run = async (client, passedOptions, interaction) => {
  let choice = passedOptions.find(x => x.name == 'type').value ?? 'slash'
  let commandName = passedOptions.find(x => x.name == 'name').value
  
  if(choice == 'slash') {
    if(commandName == 'all') {
      client.slashCommand.clear()
      client.slashCommand = new Collection()
      let mainFolder = fs.readdirSync('./Slash Commands/');
      for (const folder of mainFolder) {
        const files = fs.readdirSync(`./Slash Commands/${folder}/`)
        for (const file of files) {
          const command = require(`../Slash Commands/${folder}/${file}`)
          client.slashCommand.set(command.name, command)
         }
       }
    }
    
    else {
      let mainFolder = fs.readdirSync('./Slash Commands/');
      for (const folder of mainFolder) {
        const files = fs.readdirSync(`./Slash Commands/${folder}/`)
        for (const file of files) {
          const command = require(`../Slash Commands/${folder}/${file}`)
          if(command.name == commandName) {
            client.slashCommand.set(command.name, command)
            return interaction.reply('success reloaded command. path: ' + `../Slash Commands/${folder}/${file}`)
          }
         }
       }
      return interaction.reply(':x: there is no command with that name.')
    }
  }
  
  else if(choice == 'button') {
    
  }
  
  else if(choice == 'select') {
    
  }
  
}
