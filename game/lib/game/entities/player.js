ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	EntityPlayer = ig.Entity.extend({

		selectedHex: null,
		prevHex: null,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			ig.game.player = this;
		},

		update: function() {

			if( ig.input.pressed('select')) {
				var hex = ig.game.getHexByPixel(ig.input.mouse.x, ig.input.mouse.y);
				hex.selected = !hex.selected;
			}

			this.parent();
		},

		draw: function() {
			this.parent();

		}

	});

});
