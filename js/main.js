$(document).ready(function() {

	// all functions called from keypress
	var tile_str = "#tile-";
	var val_str = "#value-"
	var KeypressFunctions = [];
	var board = Array.apply(null,Array(16)).map(Number.prototype.valueOf,0);

	KeypressFunctions[119] = function spawn_tile(){
		var new_pos = find_empty_pos(board);
		//var new_pos = Math.round(Math.random()*15);

		console.log(new_pos)

		var tile = {val: 2, pos: new_pos}
		board[tile.pos] = tile;
		var tile_str_tot = tile_str.concat(String(new_pos));
		var tile_val_tot = val_str.concat(String(new_pos));

		//console.log(tile_str_tot)
		$(tile_str_tot).css("background-color","green");
        $(tile_val_tot).text(tile.val);
	}

	// calls function cooresponging to key
  	function start_turn(event){
 		if (KeypressFunctions[event.which]) {
    		KeypressFunctions[event.which].call();
    	}
  	}

  	function find_empty_pos(board) {
  		var all_empty = [];
  		for (var i = 0; i < 16; i++) {
  			if (board[i] == 0) {
				console.log(i)
  				all_empty.push(i);
  			}
  		}
		console.log(all_empty)
  		return all_empty[Math.round(Math.random()*(all_empty.length-1))];
  	}

  	// cathes keypress
	$(document).keypress(start_turn);
});
