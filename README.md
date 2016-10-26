# 🗿 Tic Tac Toe

This is Brittney Johnson's Slack Application Engineering: Technical Exercise. Although there are many possible improvements, it meets all the requirements given (including the time constraints of a busy student). 

### Supported `/slash` commands

- `/ttt` or `/ttt help` - List available commands
- `/ttt challenge` - Start a new tic tac toe game in the channel (overriding the last game played in the channel)
- `/ttt move` - Make a move! Options are UL,UM,UR,ML,MM,MR,LL,LM,LR, which stand for upper left, upper middle, upper right, middle left, middle middle, middle right, lower left, lower middle, lower right
- `/ttt show` - Display the current board and see whose turn it is

### Requirements:
- Users can create a new game in any Slack channel by challenging another user (using their @username).
- A channel can have at most one game being played at a time.
- Anyone in the channel can run a command to display the current board and list whose turn it is.
- Users can specify their next move, which also publicly displays the board in the channel after the move with a reminder of whose turn it is.
- Only the user whose turn it is can make the next move.
- When a turn is taken that ends the game, the response indicates this along with who won.


### Thanks and Credit To:

https://github.com/mattcreager/starbot

### License

**[This project is licensed under the terms of the MIT license.](http://license-me.herokuapp.com)**
 -- [_Need your own? There's a button for that :wink:_](https://github.com/mattcreager/license)
