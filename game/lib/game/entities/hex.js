ig.module(
	'game.entities.hex'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityHex = ig.Entity.extend({

		sides: 6,
		radius: null,
		q: null,
		r: null,
		selected: false,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.radius = settings.radius;
			this.q = settings.q;
			this.r = settings.r;
		},

		update: function() {

			this.parent();
		},

		draw: function() {
			this.parent();

			var sides = this.sides, x = this.pos.x + ig.game.screen.x, y = this.pos.y + ig.game.screen.y, radius = this.radius;
			ig.system.context.save();

			if (this.selected) {
				ig.system.context.fillStyle = "#DAE3E9";
			} else {
				ig.system.context.fillStyle = "#000000";
			}

			ig.system.context.beginPath();
			var a = ((Math.PI * 2) / sides);
			ig.system.context.translate(x, y);
			ig.system.context.moveTo(radius, 0);
			for (var i = 1; i < sides; i++) {
				ig.system.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
			}
			ig.system.context.closePath();
			ig.system.context.fill();
			ig.system.context.restore();

		}

	});

});
