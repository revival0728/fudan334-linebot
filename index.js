const express = require('express')
const linebot = require('linebot')

var bot = linebot({
    channelId: '1657151830',
    channelSecret: '42c7c1216bf6bd430f897016fef1fc5a',
    channelAccessToken: 'v9VoiM+OQjUQCZcTgK/u5rrj3JpGqHj01L3TJVPZH/QiFZfOza0ints4lFAOFom1YYtec1wnicLWA5XTWaOTeumrFr3itU3MQ6iYeksCoDkGiPGOssNN2lQ9rOB1NhqyrlBa3I3OMDqv/L3wxphFbQdB04t89/1O/w1cDnyilFU='
})

const app = express()
const linebotParser = bot.parser()
app.post('/', linebotParser)

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port
    console.log(`Running on port ${port}`)
})

bot.on('message', (event) => {
    if(event.message.type == 'text') {
        event.reply('hello')
    }
})