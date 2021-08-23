module.exports = (client, interaction) => {
  if(!interaction.inGuild()) {
    return interaction.reply({content: 'Hello there! this command can only be used in a guild (server) :D'})
  }
  if(interaction.isCommand()) {
    let command = client.slashCommand.get(interaction.commandName)
    command.run(client, interaction.options.data)
  }
}
