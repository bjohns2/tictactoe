
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Starbot',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'Play Tic Tac Toe!',
    color: '#2FA44F',
    text: '`/ttt challenge @user` lets you challenge someone named user. If a game is already being played, this will end it and start a new one. \n /ttt move UL|UM|UR|ML|MM|MR|LL|LM|LR lets you move.',
    mrkdwn_in: ['text']
  },
  {
    title: 'Got questions?',
    color: '#E3E4E6',
    text: '`/ttt help` ... you\'re lookin at it! \n',
    mrkdwn_in: ['text']
  }
]

const handler = (payload, res) => {
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /help/ig, handler: handler }
