module.exports = (client, interaction) => {
  
  if(!interaction.inGuild()) {
    return interaction.reply({content: 'Hello there! this command can only be used in a guild (server) :D'})
  }
  
  if(interaction.isCommand()) {
    let command = client.slashCommand.get(interaction.commandName)
    
    try {
      command.run(client, interaction.options.data, interaction)
    }
    catch (err) {
      interaction.reply('uh oh, there is an error executing the command.')
      console.log(err)
    }
    
  }
  
  if(interaction.isButton()) {
    //customId should look like 'commandName_{user.id}'
    let command = client.buttonCommad.get(interaction.customId.split('_')[0])
    
    try {
      command.run(client, interaction.customId, interaction)
    }
    catch (err) {
      interaction.reply('there was an error executing that command! pls try again later.')
      console.log(err)
    }
    
  }
  
  if(interaction.isSelectMenu()) {
     //customId should look like 'commandName_{user.id}'
    let command = client.selectMenu.get(interaction.customId.split('_')[0])
    
    try {
      command.run(client, interaction.customId, interaction)
    }
    catch (err) {
      interaction.reply('uhh.. the button won\'t work for some reason. weird.')
      console.log(err)
    }
    
  }
}
