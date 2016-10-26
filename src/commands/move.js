
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
  var valid_move = make_move(myboard, payload.text.split(" ")[1])

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments(boardify(myboard.currentb),payload)
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

function makeMove(board, move) {
  // var square = -1;
  // switch (move) {
  //     case "UL":
  //         square = 0;
  //         break;
  //     case "UM":
  //         square = 1;
  //         break;
  //     case "UR":
  //         square = 2;
  //         break;
  //     case "ML":
  //         square = 3;
  //         break;
  //     case "MM":
  //         square = 4;
  //         break;
  //     case "MR":
  //         square = 5;
  //         break;
  //     case "LL":
  //         square = 6;
  //         break;
  //     case "LM":
  //         square = 7;
  //         break;
  //     case "LR":
  //         square = 8;
  //         break;
  // }
  // if (square == -1 || board.currentb[square] != " ") {
  //   return false;
  // } 
  // board.currentb[square] = "X"
  return true;
}

function attachments(board,payload) {
  var attachments = [
  {
    title: 'You made a move!',
    color: '#2FA44F',
    text: board,
    mrkdwn_in: ['text']
  },
  {
    title: 'Next',
    color: '#E3E4E6',
    text: payload.text.split(" ")[1],
    mrkdwn_in: ['text']
  }
]
return attachments
}

// Takes in simple board array; returns pretty string
function boardify(board) {
  return '```| '+board[0]+' | '+board[1]+' | '+board[2]+' |\n|---+---+---|\n| '+board[3]+' | '+board[4]+' | '+board[5]+' |\n|---+---+---|\n| '+board[6]+' | '+board[7]+' | '+board[8]+' |```'
}


module.exports = { pattern: /move/ig, handler: handler }
