
'use strict'

const _ = require('lodash')
const config = require('../config')
// const bot = require('../bot')
const index = require('../index')
const trending = require('github-trending')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToe',
  icon_emoji: config('ICON_EMOJI')
}

// Handle the input! 
const handler = (ticTacToe, payload, res) => {
  // Just get the board and show it, is all
  var myboard = ticTacToe.boardsList[payload.channel_id]
  var attach = attachments(myboard,payload, 0)

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attach
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}


// Make the attachments!
function attachments(myboard,payload) {
  var player = "nobody" // if the game is over, it's nobody's turn
  if (myboard.currentplayer == 1) {
    player = myboard.player1
  } else if (myboard.currentplayer == 0) {
    player = myboard.player0
  }
  var board = boardify(myboard.currentb)
  var attachments = [
  {
    title: "Here's the current board: ",
    color: '#2FA44F',
    text: board,
    mrkdwn_in: ['text']
  },
  {
    title: 'The Deets',
    color: '#E3E4E6',
    text: "It's " + player + "'s turn!",
    mrkdwn_in: ['text']
  }
]
return attachments
}

// Takes in simple board array; returns pretty string
function boardify(board) {
  return '```| '+board[0]+' | '+board[1]+' | '+board[2]+' |\n|---+---+---|\n| '+board[3]+' | '+board[4]+' | '+board[5]+' |\n|---+---+---|\n| '+board[6]+' | '+board[7]+' | '+board[8]+' |```'
}


module.exports = { pattern: /show/ig, handler: handler }
