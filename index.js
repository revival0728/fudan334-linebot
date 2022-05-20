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

// testReminder
var testReminderTimer
const testDate = new Date(2023, 1, 13)
const getTestReminderText = () => {
    let left = new Date(testDate.getTime() - Date.now())
    return `學測到數: 剩下 ${left.getDay()} 天`
}
const testReminderRegular = () => {
    clearTimeout(testReminderTimer)
    bot.broadcast(getTestReminderText())
    testReminderTimer = setInterval(testReminderRegular, 86400000)
}

testReminderRegular()

// reply
const replyConfig = {
    '告訴我學測剩下幾天': getTestReminderText
}
bot.on('message', (event) => {
    if(event.message.type == 'text') {
        let msg = event.message.text
        if(msg in replyConfig) {
            event.reply(replyConfig[msg]()).then((data) => {
                console.log('success')
            }).catch(err => {
                console.log(err)
            })
        }
    }
})