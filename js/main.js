$(document).ready(function() {

	// all functions called from keypress
	var tile_str = "#tile-";
	var val_str = "#value-"
	var KeypressFunctions = [];
	board = Array.apply(null,Array(5)).map(Number.prototype.valueOf,0);
	
	KeypressFunctions[119] = function spawn_tile() {
		var new_pos = Math.round(Math.random()*15);
		console.log(new_pos)
		var tile = {val: 2, pos: new_pos}
		board[tile.idx] = tile;
		var tile_str_tot = tile_str.concat(String(new_pos));
		var tile_val_tot = val_str.concat(String(new_pos));

		console.log(tile_str_tot)
		$(tile_str_tot).css("background-color","green");
        $(tile_val_tot).text(tile.val);
	}

	// calls function cooresponging to key
  	function start_turn(event){
 		if (KeypressFunctions[event.which]) {
    		KeypressFunctions[event.which].call();
    	}
  	}

  	// cathes keypress
	$(document).keypress(start_turn);
});
