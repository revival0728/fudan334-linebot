const express = require('express')
const linebot = require('linebot')
const https = require('https')

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

// keep alive
/*setInterval(function() {
    https.get('https://fudanttf-linebot.herokuapp.com/')
}, 300000); // every 5 minutes (300000)*/

// testReminder
var testReminderTimer
const testDate = new Date(2023, 1, 13)
const getTestReminderText = () => {
    let left = new Date(testDate.getTime() - Date.now())
    left = Math.floor(left.getTime() / 86400000) - 30

    if(left > 0)
        return `學測倒數: 剩下 ${left} 天`
    else if(left == 0)
        return `學測倒數: 學測當天`
    else
        return `學測倒數: 學測可能正在進行，也有可能已經解脫了😄`
}
const testReminderRegular = () => {
    clearTimeout(testReminderTimer)
    bot.broadcast(getTestReminderText())
    testReminderTimer = setInterval(testReminderRegular, 24*60*60*1000)
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
