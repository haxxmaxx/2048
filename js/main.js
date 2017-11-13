// main.js
// Main javascript file for 2048 project.
// Game loop is run from here and calls functions in help_functions.js.
//
// Max Gefvert, max.gefvert@gmail.com, created 2017-11-09



// initiate board, object containing all global variables
var board = {
	tiles: [],			// array storing tile objects
	hues: [0,30,60,80,120,160,200,230,260,280,310],	// hue values for tiles
	score: 0,			// total score							
	is_legal: [],		// array with booleans for which moves are possible
	is_running: false	// true when the game is running
};

$(document).ready(function() {
  	// cathes keypress
	$(document).keypress(turn);

	// calls function corresponding to key
  	function turn(event) {
  		// move only if move is possible and game is running
		if (board.is_running && board.is_legal[event.which]) {
  			// try to move 3 times
 			for (var k = 1; k <= 3; k++) {
    			keypress_functions[event.which].call();
    		}
    		// adds tile, display tiles and check possible moves
			turn_update();
			// game over if no possible moves, game won if 2048 tile is acquired
			end_game();
		// starts new game if game not running
    	} else if(!board.is_running && event.which == 13) {	
  			keypress_functions[event.which].call();
  		}
  	}
});