
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
  var myboard = ticTacToe.boardsList[payload.channel_id]
  var move_string =  payload.text.split(" ")[1];
  var valid_move = makeMove(myboard,move_string,payload.user_name);
  ticTacToe.boardsList[payload.channel_id] = myboard
  // console.log(myboard)
  // console.log(ticTacToe)
  var attach = attachments(boardify(myboard.currentb),payload, 0)
  if (valid_move == false) {
    // return "invalid move" messge
    attach = attachments(boardify(myboard.currentb),payload, 0)
  } else {
    // check if someone won or the game ended
    var result = endgame(myboard)
    if (result == "") {
      attach = attachments(boardify(myboard.currentb),payload, 1)
    } else if (result == "X") {
      myboard.currentplayer = 2
      attach = attachments(boardify(myboard.currentb),payload, 2)
    } else if (result == "O") {
      myboard.currentplayer = 2
      attach = attachments(boardify(myboard.currentb),payload, 3)
    } else if (result == "tie") {
      myboard.currentplayer = 2
      attach = attachments(boardify(myboard.currentb),payload, 4)
    }
  }

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attach
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}



function attachments(board,payload,) {
  var messages = ["Sorry, you can't make that move.","Good move!","X won!","O won!","Tie :|","Here you go!"]
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
    text: "It's " + board.currentplayer + "'s turn!",
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
