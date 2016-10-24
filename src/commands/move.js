
'use strict'

const _ = require('lodash')
const config = require('../config')
const trending = require('github-trending')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Starbot',
  icon_emoji: config('ICON_EMOJI')
}

board = 'XXXOOOXXX'

let attachments = [
  {
    title: 'Starbot will help you find the hippest repos on GitHub!',
    color: '#2FA44F',
    text: '```| X | O | O |\n|---+---+---|\n| O | X | X |\n|---+---+---|\n| X | O | X |```'+board,
    mrkdwn_in: ['text']
  },
  {
    title: 'Configuring Starbot',
    color: '#E3E4E6',
    text: '`/starbot help` ... you\'re lookin at it! \n',
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




module.exports = { pattern: /move/ig, handler: handler }
