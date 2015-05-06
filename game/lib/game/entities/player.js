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

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			ig.game.player = this;
		},

		update: function() {

			this.parent();
		}

	});

});
