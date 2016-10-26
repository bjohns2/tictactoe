
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


const handler = (myboard, payload, res) => {
  // if (myboard.currentb[0] == "X") {
  //   myboard.currentb[0] = "O"
  // } else {
  //   myboard.currentb[0] = "X"
  // }
  // myboard.currentb = myboard.currentb + "o"
  var player_string =  payload.text.split(" ")[1];
  // myboard.player1 = player_string
  // myboard.player0 = payload.user_name
  // myboard.currentb = [" "," "," "," "," "," "," "," "," "]
  // var valid_move = makeMove(myboard,move_string,payload.user_name);

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments(boardify(myboard.currentb),payload)
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

function attachments(board,payload) {
  var attachments = [
  {
    title: 'You started a game!',
    color: '#2FA44F',
    text: board,
    mrkdwn_in: ['text']
  },
  {
    title: 'Players: ',
    color: '#E3E4E6',
    text: "and " , //board.player0 + " and " + board.player1,
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