const axios = require('axios');
module.exports.name = 'kusonime'
module.exports.cooldown = 60
module.exports.description = 'download anime dari kusonime'
module.exports.options = [{
  name: 'query',
  description: 'anime yang mau dicari',
  type: 3,
  required: true
}]
module.exports.run = async (client, passedOptions, interaction) => {
  let query = passedOptions[0].value.split(' ').join('-')
  let search = await axios.get(`http://posantai.bugs.today/kusonime/api/anime/${query}`)
  search = search.data
  let sinopsis = search.sinopsis.length > 150 ? search.sinopsis.slice(0, 150) + '...' : search.sinopsis
  
  let oriPlaceHolder = []
  
  for(const resolusi of search.list_download[0][1]) {
    /*[
       {resolusi: ..., link: [ {platform: ..., link: ...}, {...} ] },
       {resolusi: ..., link: [ {platform: ..., link: ...}, {...} ] }
      ]
    */
   let data = {name: `**${resolusi.resolusi}**`, value: resolusi.link_download.map(a => `[${a.platform}](${a.link})`).join('\n'), inline: true}
   oriPlaceHolder.push(data)
  }
  
  interaction.reply({embeds: [{author: {name: search.title,  url: undefined},
                              description: sinopsis,
                               color: 'RANDOM',
                               fields: [{name: 'Genre', value: search.genre.map(g => g.name).join(', '), inline: false},
                                        {name: 'Type', value: search.type, inline: true},
                                        {name: 'Status', value: search.status, inline: true},
                                        {name: 'Rating', value: search.score, inline: true},
                                        {name: 'Durasi', value: search.durasi, inline: true},
                                        {name: 'Tanggal Rilis', value: search.release, inline: true}
                                        ],
                              thumbnail: {url: search.thumbnail} }, {
                                title: 'link download',
                                color: 'RANDOM',
                                fields: oriPlaceHolder,
                                image: {url: search.thumbnail}
                              }]
                   })
}
