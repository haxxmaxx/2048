// 2048.js
// 2048 game main file.
// Game loop is run from here and calls functions in 2048-service.js.
//
// Max Gefvert, max.gefvert@gmail.com, created 2017-11-09



var board = {
	tiles: [],			// array storing tile objects
	hues: [0,30,60,80,120,160,200,230,260,280,310],	// hue values for tiles
	score: 0,			// total score							
	isLegal: {},		// object with booleans for which moves are possible
	isRunning: false	// true when the game is running
};

var ACTIONS = {
	13: 'start',
	119: 'up',
	115: 'down',
	97: 'left',
	100: 'right'
}

$(document).ready(function() {
	$(document).keypress(turn);

  	function turn(event) {
		var action = ACTIONS[event.which];

		if (board.isRunning && board.isLegal[action]) {
			
  			// try to move tiles 3 times
 			for (var move = 1; move <= 3; move++) {
    			keypressFunctions[action].call();
			}
			
			turnUpdate();
			endGame(); // game over if no possible moves, game won if 2048 tile is acquired
    	} else if(!board.isRunning && action === 'start') {
  			keypressFunctions[action].call(); // start new game
  		}
  	}
});
