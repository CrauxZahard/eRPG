let cmd = require('node-cmd')

module.exports.name = 'update'
module.exports.description = 'pull latest file from github'
module.exports.options = [{name: 'reload',
                          description: 'whether to auto reload upon updating files',
                          type: 5,
                          required: false}]
module.exports.run = async (client, passedOptions, interaction) => {
  if(interaction.user.id != '694573382380945529') return interaction.reply({content: 'you aren\'t my developer, b-baka!', ephemeral: true})
  
  await cmd.run('git pull', (err, data, sttder) => {
    if(err) return interaction.reply({content: 'an error has occureed! ' + err.message, ephemeral: true})
    if(data == 'Already up to date.') return interaction.reply({content: 'uh, ini udah versi terbaru kk', ephemeral: true})
    if(data.startsWith('Updating')) return interaction.reply({content: 'horeee! update sudah berhasil!\n' + data.split('Updating')[1].split('Fast-forward')[1] })
  })
  if(passedOptions[0]?.value) {
    //client.slashCommand.get()
  }
  
}
