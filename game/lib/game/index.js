ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.GameLevel',
	'game.entities.player',
	'game.entities.hex'
)
.defines(function(){

	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;
	var grid = new Grid();

	var GAME_DATA = window.params.gameData;

	var blackFont = new ig.Font( 'media/fonts/black.font.png' );

	GAME = ig.Game.extend({

		init: function() {

			ig.input.bind( ig.KEY.MOUSE1, 'select' );
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			ig.input.bind( ig.KEY.UP_ARROW, 'up' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );

			grid.tileSize = 50;
			grid.tileSpacing = 2;
			grid.pointyTiles = false;
			grid.withOrigin  = true;

			var coordinates = grid.hexagonCoordinates(0, 0, 5);

			console.log(GAME_DATA);
			var tiles = GAME_DATA.tiles;

			this.loadLevel( LevelGameLevel );

			this.spawnEntity(EntityPlayer, 0, 0);

			for (var i = 0; i < tiles.length; i++) {
				var q = tiles[i].q;
				var r = tiles[i].r;
				var center = grid.getCenterXY(q, r);
				this.spawnEntity(
					EntityHex,
					center.x + this.screen.x,
					center.y + this.screen.y,
					{
						radius: grid.tileSize,
						q: q,
						r: r
					}
				);
			}

		},

		update: function() {

			var player = this.getEntitiesByType(EntityPlayer)[0];
			if (player) {
				this.screen.x = player.pos.x - ig.system.width / 2;
				this.screen.y = player.pos.y - ig.system.height / 2;
			}

			this.parent();
		},

		draw: function() {

			this.parent();
		},

		getHexByPixel: function (x, y) {
			var hex = grid.pixelToAxial(x, y);
			return this.getHexByCord(hex.q, hex.r);
		},

		getHexByCord: function(q, r) {
			var hexes =  this.getEntitiesByType(EntityHex);
			for (var i = 0; i < hexes.length; i++) {
				if (hexes[i].q === q && hexes[i].r === r) {
					return hexes[i];
				}
			}
			return false;
		}
	});

	TITLE = ig.Game.extend({

		init: function() {

			ig.input.bind( ig.KEY.ENTER, 'start' );

			this.loadLevel( LevelGameLevel );
		},

		update: function() {

			if( ig.input.pressed('start')) {
				ig.system.setGame( GAME );
				return;
			}

			this.parent();
		},

		draw: function() {
			this.parent();

			blackFont.draw('Cristallum', WIDTH / 2, 20, ig.Font.ALIGN.CENTER );
			blackFont.draw('Press ENTER to start', WIDTH / 2, 40, ig.Font.ALIGN.CENTER );

		}
	});

	// If our screen is smaller than 640px in width (that's CSS pixels), we scale the 
	// internal resolution of the canvas by 2. This gives us a larger viewport and
	// also essentially enables retina resolution on the iPhone and other devices 
	// with small screens.
	var scale = (WIDTH < 640) ? 2 : 1;

	// We want to run the game in "fullscreen", so let's use the window's size
	// directly as the canvas' style size.
	var canvas = document.getElementById('canvas');
	canvas.style.width = WIDTH + 'px';
	canvas.style.height = HEIGHT + 'px';

	// Listen to the window's 'resize' event and set the canvas' size each time
	// it changes.
	window.addEventListener('resize', function(){
		// If the game hasn't started yet, there's nothing to do here
		if( !ig.system ) { return; }

		// Resize the canvas style and tell Impact to resize the canvas itself;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );

		// Also repositon the touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.align();
		}
	}, false);

	var width = WIDTH * scale, height = HEIGHT * scale;
	ig.main( '#canvas', GAME, 60, width, height, 1, ig.ImpactSplashLoader );

});
