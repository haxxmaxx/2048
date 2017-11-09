$(document).ready(function() {

	// global variables
	var tile_str = "#tile-";
	var val_str = "#value-"
	var board = Array.apply(null,Array(16)).map(Number.prototype.valueOf,0);
	var score = 0;

	// spawn first tiles
	//spawn_tile(); spawn_tile(); draw_tiles();

	// all functions called from keypress
	var KeypressFunctions = [];
	KeypressFunctions[119] = function press_up(){
		move_up();
	}

	KeypressFunctions[100] = function press_right(){
		move_right();
	}

	// spawns tile at random empty position, 1 in X have value 4
	function spawn_tile(){
		// create tile object
		var new_pos = find_empty_pos();
		var tile = {val: 2, pos: new_pos, done: false}

		// add to board array
		board[tile.pos] = tile;
	}

	// calls function cooresponging to key
  	function start_turn(event){
 		if (KeypressFunctions[event.which]) {
    		KeypressFunctions[event.which].call();
    		spawn_tile();
			draw_tiles();
			// if (!find_empty_pos())
			// 	console.log("GAME OVER")
    	}
  	}

  	// returns random empty position
  	function find_empty_pos() {
  		var all_empty = [];
  		for (var i = 0; i < 16; i++) {
  			if (board[i] == 0) {
  				all_empty.push(i);
  			}
  		}
  		return all_empty[Math.round(Math.random()*(all_empty.length-1))];
  	}

  	// moves (or merges) all tiles one step right if possible 
  	function move_up() {
  		for (var k = 1; k < 5; k++) {
	  		for (var i = 4; i < 16; i++) {
	  			if(board[i] != 0 && board[i].done == false) {
	  				if(board[i].val == board[i-4].val) {
	  					merge(i,-4);
	  				} else if(board[i-4] == 0) {
	  					move(i,-4);
	  				} else {
	  					board[i].done = true;
	  				}
	        	}
	  		}
	  	}
  	}

  	// moves (or merges) all tiles one step right if possible 
  	function move_right() {
  		for (var i = 14; i > -1; i--) {
  			if(board[i] != 0 && i % 4 != 3) {
  				if(board[i].val == board[i+1].val) {
  					merge(i,1);
  				} else if(board[i+1] == 0) {
  					move(i,1);
  				}
        	}
  		}
  	}

  	function merge(i,step) {
  		var new_val = board[i+step].val*2;
  		board[i+step].val = new_val;
  		score = score + new_val;
  		console.log(score);
  		board[i] = 0;
  	}

  	function move(i,step) {
  		board[i+step] = board[i];
  		board[i] = 0;
  	}

  	// cathes keypress
	$(document).keypress(start_turn);

	// draws all tiles 
	function draw_tiles() {
		for (var i = 0; i < 16; i++) {
			board[i].done = false;
			var val = board[i].val;
			if(val){
				$(tile_str.concat(String(i))).css("background-color","green");
	        	$(val_str.concat(String(i))).text(val);
			} else {
				$(tile_str.concat(String(i))).css("background-color","red");
	        	$(val_str.concat(String(i))).text("");
			}
		}
	}

});
