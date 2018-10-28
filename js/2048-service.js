// 2048-service.js
// Service functions used in 2048 game.
//
// Max Gefvert, max.gefvert@gmail.com, created 2017-11-09



keypressFunctions = {
	start: function () {
		// resets variables
		board.tiles = new Array(16).fill(null);
		board.score = 0;
		board.isLegal = {};
		board.isRunning = true;
	
		spawnTile();
		turnUpdate(); // also calls spawn_tile => 2 tiles spawned
		$('#instr').text('USE WASD TO MOVE');
		$('#points').text('0');
	},

	up: function () {
		for (var k = 1; k <= 3; k++) {
			for (var idx = 4; idx < 16; ++idx) {
				if(board.tiles[idx] && !board.tiles[idx].isMerged) {
					moveOrMerge(idx, -4);
				}
			}
		}
	},

	down: function () {
		for (var idx = 11; idx > -1; --idx) {
			if(board.tiles[idx] && !board.tiles[idx].isMerged) {
				moveOrMerge(idx, 4);
			}
		}
	},

	left: function () {
		for (var idx = 1; idx < 16; ++idx) {
			if(idx % 4 && board.tiles[idx] && !board.tiles[idx].isMerged) {
				moveOrMerge(idx, -1);
			   }
		}	
	},

	right: function () {
		for (var idx = 14; idx > -1; --idx) {
			if(idx % 4 !== 3 && board.tiles[idx] && !board.tiles[idx].isMerged) {
				moveOrMerge(idx, 1);
			}
		}	
	}
};

// checks which moves are possible for next move and draws tiles
function turnUpdate() {
	board.isLegal = {}
	spawnTile();

	for (var idx = 0; idx < 16; idx++) {
		if (board.tiles[idx]) {
			if (idx > 3 && !board.isLegal.up && checkIflegal(idx, -4)) {
				board.isLegal.up = true;
			}

			if (idx < 12 && !board.isLegal.down && checkIflegal(idx, 4)) {
				board.isLegal.down = true;
			}

			if (idx % 4 && !board.isLegal.left && checkIflegal(idx, -1)) {
				board.isLegal.left = true;
			}

			if (idx % 4 !== 3 && !board.isLegal.right && checkIflegal(idx, 1)) {
				board.isLegal.right = true;
			}

			board.tiles[idx].isMerged = false;
		}

		drawTile(idx)
    }
}


// ends the game if either won or lost
function endGame() {
	if (isEnd()) {
		// remove values from board
		for (var idx = 0; idx < 16; idx++) {
			$('#value-' + idx).text('');
		}

		$('#instr').text('PRESS ENTER TO RESTART');
		board.isRunning = false;

		if (isWin()) {
			$('#value-4').text('2'); $('#value-5').text('0');
			$('#value-6').text('4'); $('#value-7').text('8');
			$('#value-8').text('W'); $('#value-9').text('I');
			$('#value-10').text('N'); $('#value-11').text('!');
		} else {
			// no possible moves => game over...
			for (var idx = 0; idx < 16; idx++) {
				$('#value-' + idx).text('');
			}

			$('#value-4').text('G'); $('#value-5').text('A');
			$('#value-6').text('M'); $('#value-7').text('E');
			$('#value-8').text('O'); $('#value-9').text('V');
			$('#value-10').text('E'); $('#value-11').text('R');
		}
	}
}

// spawns tile at random empty position, 1 in 10 have value 4
function spawnTile() {
	var newPos = findEmptyPos(),
		tile = { val: Math.random() < 0.9 ? 2 : 4, isMerged: false };

	board.tiles[newPos] = tile;
}

// checks if game should end
function isEnd() {
	return (!board.isLegal.right &&
	   !board.isLegal.left &&
	   !board.isLegal.up &&
	   !board.isLegal.down) ||
	   isWin();
}

// moves if adjecent position is empty, merges if same value
function moveOrMerge(idx, step) {
	var tile = board.tiles[idx],
		otherTile = board.tiles[idx + step];

	if (!otherTile) { // move
		otherTile = tile;
		tile = null;
	} else if (tile.val === otherTile.val && !otherTile.isMerged) { // merge
		var newVal = tile.val * 2;

		otherTile.val = newVal;
		otherTile.isMerged = true; // only merge once per turn
		tile = null;

		board.score = board.score + newVal;
		$('#points').text(board.score);
	}

	board.tiles[idx] = tile;
	board.tiles[idx + step] = otherTile;
}

// draws one tile
function drawTile(idx) {
	if (board.tiles[idx]) {
		var val = board.tiles[idx].val;

		// sets color according to value, hues stored in board object
		var color = 'hsl(' + board.hues[Math.log2(val) - 1] + ', 100%, 70%)';

		$('#tile-' + idx).css('background-color', color);
	    $('#value-' + idx).text(val);
	} else {
		$('#tile-' + idx).css('background-color', 'hsl(0, 0%, 90%)');
	    $('#value-' + idx).text('');
	}
}

// returns random empty position
function findEmptyPos() {
	var allEmptyPos = [],
		randomPos

	board.tiles.forEach( function(tile, idx) {
		if (!tile) {
			allEmptyPos.push(idx);
		}
	});

	randomPos = Math.round(Math.random() * (allEmptyPos.length - 1));
	return allEmptyPos[randomPos];
}

// returns true if 2048 tile exists
function isWin() {
	board.tiles.forEach(function (tile) {
		if (tile && tile.val === 2048) {
			return true;
		}
	});

	return false;
}

function checkIflegal(idx, step) {
	return !board.tiles[idx + step] || board.tiles[idx].val === board.tiles[idx + step].val;
}

// randomizes color for all tiles at window load
function initRandomColor() {
	for (var i = 0; i < 16; i++) {
		var hue = board.hues[Math.round(Math.random() * 10)];
		$('#tile-' + i).css('background-color', 'hsl(' + hue + ', 100%, 70%)');
	}
}
