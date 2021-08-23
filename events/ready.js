module.exports = async client => {
  await require('../handler/SlashCommand.js')(client); //bulkOverwrite-ing slash command
  console.log(`${client.user.tag} is ready to launch!`)
}
