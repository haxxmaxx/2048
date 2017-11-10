// global variables
board = {
	tiles: Array.apply(null,Array(16)).map(Number.prototype.valueOf,0),
	score: 0,
	is_legal: [],
	is_up_legal: true,
	is_down_legal: true,
	is_left_legal: true,
	is_right_legal: true,
	is_running: false
};

board.is_legal[119] = true;	// = up
board.is_legal[115] = true; // = down
board.is_legal[97] = true;	// = left
board.is_legal[100] = true;	// = right

$(document).ready(function() {
  	// cathes keypress
	$(document).keypress(start_turn);

	// calls function cooresponging to key
  	function start_turn(event) {
  		//console.log(board.is_legal);
  		if(event.which == 13) {
  			keypress_functions[event.which].call();
  		}
  		console.log(board.is_legal[event.which])
 		if (board.is_legal[event.which]) {
    		keypress_functions[event.which].call();
    		spawn_tile();
			turn_update();
			if (!board.is_legal[119] && !board.is_legal[115] &&
				!board.is_legal[97] && !board.is_legal[100]) {
				console.log("GAME OVER")
			}
    	}
  	}
});
