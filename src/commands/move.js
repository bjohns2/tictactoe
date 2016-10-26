
'use strict'

const _ = require('lodash')
const config = require('../config')
// const bot = require('../bot')
const index = require('../index')
const trending = require('github-trending')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Starbot',
  icon_emoji: config('ICON_EMOJI')
}

var myboard2 = "wow"






const handler = (myboard, payload, res) => {
  myboard = myboard + "x"

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments(myboard)
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

function attachments(board) {
  var attachments = [
  {
    title: 'Starbot will help you find the hippest repos on GitHub!',
    color: '#2FA44F',
    text: myboard2,
    mrkdwn_in: ['text']
  },
  {
    title: 'Configuring Starbot',
    color: '#E3E4E6',
    text: '`/starbot help` ... you\'re lookin at it! \n',
    mrkdwn_in: ['text']
  }
]
return attachments
}


module.exports = { pattern: /move/ig, handler: handler }
