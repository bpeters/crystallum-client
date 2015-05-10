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

		speed: 200,
		selectedHex: null,
		direction: 0,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			ig.game.player = this;
		},

		update: function() {

			if ( ig.input.pressed('select')) {
				var hex = ig.game.getHexByPixel(ig.input.mouse.x - ig.game.screen.x - WIDTH / 2, ig.input.mouse.y - ig.game.screen.y - HEIGHT / 2);
				if (hex) {
					if (this.selectedHex) {
						this.selectedHex.selected = false;
					}
					hex.selected = true;
					this.selectedHex = hex;
				}
			}

			// Movement
			var direction = this.direction;
			if (ig.input.state('left')) {
				if (ig.input.state('up')) {
					direction = 8;
				} else if (ig.input.state('down')) {
					direction = 6;
				} else {
					direction = 7;
				}
			} else if (ig.input.state('right')) {
				if (ig.input.state('up')) {
					direction = 2;
				} else if (ig.input.state('down')) {
					direction = 4;
				} else {
					direction = 3;
				}
			} else if (ig.input.state('down')) {
				if (ig.input.state('left')) {
					direction = 6;
				} else if (ig.input.state('right')) {
					direction = 4;
				} else {
					direction = 5;
				}
			} else if (ig.input.state('up')) {
				if (ig.input.state('left')) {
					direction = 8;
				} else if (ig.input.state('right')) {
					direction = 2;
				} else {
					direction = 1;
				}
			} else {
				this.vel.x = 0;
				this.vel.y = 0;
				direction = 0;
			}

			switch (direction) {
				case 1:
					this.vel.x = 0;
					this.vel.y = +this.speed;
					break;

				case 2:
					this.vel.x = -this.speed;
					this.vel.y = +this.speed;
					break;

				case 3:
					this.vel.x = -this.speed;
					this.vel.y = 0;
					break;

				case 4:
					this.vel.x = -this.speed;
					this.vel.y = -this.speed;
					break;

				case 5:
					this.vel.x = 0;
					this.vel.y = -this.speed;
					break;

				case 6:
					this.vel.x = +this.speed;
					this.vel.y = -this.speed;
					break;

				case 7:
					this.vel.x = +this.speed;
					this.vel.y = 0;
					break;

				case 8:
					this.vel.x = +this.speed;
					this.vel.y = +this.speed;
					break;
			}

			//screen movement (Camera)
			ig.game.screen.x = this.pos.x;
			ig.game.screen.y = this.pos.y;

			this.parent();
		},

		draw: function() {
			this.parent();

		}

	});

});
