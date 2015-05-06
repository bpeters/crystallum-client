ig.module(
	'game.entities.hex'
)
.requires(
	'impact.entity'
)
.defines(function(){

	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;

	EntityHex = ig.Entity.extend({

		sides: 5,
		radius: null,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.radius = settings.radius;
			ig.game.hex = this;
		},

		update: function() {

			this.parent();
		},

		draw: function() {
			var sides = this.sides, x = this.pos.x, y= this.pos.y, radius = this.radius;

			ig.system.context.beginPath();
			var a = ((Math.PI * 2) / sides);
			ig.system.context.translate(x, y);
			ig.system.context.moveTo(radius, 0);
			for (var i = 1; i < sides; i++) {
				ig.system.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
			}
			ig.system.context.closePath();
			ig.system.context.fillStyle = "rgb(0,0,0)";
			ig.system.context.fill();
		}

	});

});