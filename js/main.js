// initiate board, object containing all global variables
var board = {
	tiles: [],
	score: 0,
	is_legal: [],
	is_up_legal: false,
	is_down_legal: false,
	is_left_legal: false,
	is_right_legal: false,
	is_running: false
};

$(document).ready(function() {
  	// cathes keypress
	$(document).keypress(turn);

	// calls function corresponding to key
  	function turn(event) {
  		console.log(board.is_running)
		if (board.is_running && board.is_legal[event.which]) {
  			// try to move 3 times
 			for (var k = 1; k <= 3; k++) {
    			keypress_functions[event.which].call();
    		}
    		// adds tile, display tiles and check possible moves
			turn_update();
			//GAME OVER if no possible moves, WIN if 2048 tile is acquired
			end_game();
		//starts new game if game not running
    	} else if(!board.is_running && event.which == 13) {	
  			keypress_functions[event.which].call();
  		}
  	}
});