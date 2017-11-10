// initiate board, board containing all global variables
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

// board.is_legal[119] = true;	// = up
// board.is_legal[115] = true; // = down
// board.is_legal[97] = true;	// = left
// board.is_legal[100] = true;	// = right

$(document).ready(function() {
  	// cathes keypress
	$(document).keypress(turn);

	// calls function corresponding to key
  	function turn(event) {
  		console.log(board.is_legal[event.which])
		if (board.is_running && board.is_legal[event.which]) {
  			// try to move 3 times
 			for (var k = 1; k <= 3; k++) {
    			keypress_functions[event.which].call();
    		}
    		spawn_tile();
			turn_update();
			if (!board.is_legal[119] && !board.is_legal[115] &&
				!board.is_legal[97] && !board.is_legal[100]) {
				game_over();
			}
    	} else if(event.which == 13) {
    		//starts new game if not started
  			keypress_functions[event.which].call();
  			console.log("starting");
  		}
  	}
});
