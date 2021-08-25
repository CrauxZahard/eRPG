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
  let choice = passedOptions[1].value ?? 'slash'
  if(passedOptions[0].value == 'all') {
   c 
  }
}
