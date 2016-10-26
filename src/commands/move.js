
'use strict'

const _ = require('lodash')
const config = require('../config')
// const bot = require('../bot')
const index = require('../index')
const trending = require('github-trending')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'ticTacToe',
  icon_emoji: config('ICON_EMOJI')
}



// Handle the input! 
const handler = (ticTacToe, payload, res) => {
  var myboard = ticTacToe.boardsList[payload.channel_id]
  var move_string =  payload.text.split(" ")[1];
  // Make a Move
  var valid_move = makeMove(myboard,move_string,payload.user_name);
  ticTacToe.boardsList[payload.channel_id] = myboard
  var attach = attachments(myboard,payload, 0)
  if (valid_move == false) {
    // return "invalid move" messge
    attach = attachments(myboard,payload, 0)
  } else {
    // check if someone won or the game ended
    var result = endgame(myboard)
    if (result == "") {
      attach = attachments(myboard,payload, 1)
    } else if (result == "X") {
      myboard.currentplayer = 2
      attach = attachments(myboard,payload, 2)
    } else if (result == "O") {
      myboard.currentplayer = 2
      attach = attachments(myboard,payload, 3)
    } else if (result == "tie") {
      myboard.currentplayer = 2
      attach = attachments(myboard,payload, 4)
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

// Check if the game is over via someone winning or a tie
function endgame(board) {
  var b = board.currentb
  var winner = ""
  if (b[0] == b[1] && b[1] == b[2] && b[0] != " ") {
      winner = b[0]
  } else if (b[3] == b[4] && b[4] == b[5] && b[3] != " ") {
      winner = b[3]
  } else if (b[6] == b[7] && b[7] == b[8] && b[6] != " ") {
      winner = b[6]
  } else if (b[0] == b[3] && b[3] == b[6] && b[0] != " ") {
      winner = b[0]
  } else if (b[1] == b[4] && b[4] == b[7] && b[1] != " ") {
      winner = b[1]
  } else if (b[2] == b[5] && b[5] == b[8] && b[2] != " ") {
      winner = b[2]
  } else if (b[0] == b[4] && b[4] == b[8] && b[0] != " ") {
      winner = b[0]
  } else if (b[2] == b[4] && b[4] == b[6] && b[2] != " ") {
      winner = b[2]
  } else if (b[0] != " " && b[1] != " " && b[2] != " " && b[3] != " " && b[4] != " " && b[5] != " " && b[6] != " " && b[7] != " " && b[8] != " " ){
    winner = "tie"
  }
  return winner
}

// Make a move for a player; modifies board
function makeMove(board,move,player) {
  console.log(board)
  console.log(move)
  console.log(player)
  var square = -1;
  switch (move) {
      case "UL":
          square = 0;
          break;
      case "UM":
          square = 1;
          break;
      case "UR":
          square = 2;
          break;
      case "ML":
          square = 3;
          break;
      case "MM":
          square = 4;
          break;
      case "MR":
          square = 5;
          break;
      case "LL":
          square = 6;
          break;
      case "LM":
          square = 7;
          break;
      case "LR":
          square = 8;
          break;
  }
  if (square == -1 || board.currentb[square] != " ") {
    return false;
  } 
  if (board.currentplayer == 1 && board.player1 == player) {
    board.currentb[square] = "X"
    board.currentplayer = 0
  } else if (board.currentplayer == 0 && board.player0 == player) {
    board.currentb[square] = "O"
    board.currentplayer = 1
  } else {
    return false
  }
  console.log(board)
  return true;
}

// Make the output! 
// case: 
//  0 : invalid move 
//  1 : valid move
//  2 : valid move, X won
//  3 : valid move, O won
//  4 : valid move, tie
function attachments(myboard,payload,casenum) {
  var player = "nobody" // if the game is over, it's nobody's turn
  if (myboard.currentplayer == 1) {
    player = myboard.player1
  } else if (myboard.currentplayer == 0) {
    player = myboard.player0
  }
  var board = boardify(myboard.currentb)
  var messages = ["Sorry, you can't make that move.","Good move!","X won!","O won!","Tie :|"]
  var attachments = [
  {
    title: payload.user_name + ' made a move!',
    color: '#2FA44F',
    text: board,
    mrkdwn_in: ['text']
  },
  {
    title: 'Next',
    color: '#E3E4E6',
    text: messages[casenum] + "\nIt's currently " +player+ "'s turn!",
    mrkdwn_in: ['text']
  }
]
return attachments
}

// Takes in simple board array; returns prettier string
function boardify(board) {
  return '```| '+board[0]+' | '+board[1]+' | '+board[2]+' |\n|---+---+---|\n| '+board[3]+' | '+board[4]+' | '+board[5]+' |\n|---+---+---|\n| '+board[6]+' | '+board[7]+' | '+board[8]+' |```'
}


module.exports = { pattern: /move/ig, handler: handler }
