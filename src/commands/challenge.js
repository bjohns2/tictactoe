
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

// var myboard2 = "wow"



const handler = (ticTacToe, payload, res) => {
  // if (myboard.currentb[0] == "X") {
  //   myboard.currentb[0] = "O"
  // } else {
  //   myboard.currentb[0] = "X"
  // }
  // myboard.currentb = myboard.currentb + "o"
  console.log("hi")
  var move_string =  payload.text.split(" ")[1];
  // boardsList[payload.channel_id] = {}
  var myboard = {} //boardsList[payload.channel_id]
  myboard.player0 = payload.user_name
  myboard.player1 = move_string
  myboard.currentb = [" "," "," "," "," "," "," "," "," "]
  channel = payload.channel_id
  ticTacToe.boardsList[channel] = myboard

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments(myboard,payload)
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}


function attachments(board,payload) {
  var attachments = [
  {
    title: 'You made a move!',
    color: '#2FA44F',
    text: boardify(board.currentb),
    mrkdwn_in: ['text']
  },
  {
    title: 'Next',
    color: '#E3E4E6',
    text: board.player0,
    mrkdwn_in: ['text']
  }
]
return attachments
}

// Takes in simple board array; returns pretty string
function boardify(board) {
  return '```| '+board[0]+' | '+board[1]+' | '+board[2]+' |\n|---+---+---|\n| '+board[3]+' | '+board[4]+' | '+board[5]+' |\n|---+---+---|\n| '+board[6]+' | '+board[7]+' | '+board[8]+' |```'
}


module.exports = { pattern: /challenge/ig, handler: handler }
