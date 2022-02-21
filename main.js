import { rectangleCollision } from "./lib/utils.js";
import Level from "./lib/Level.js";
import Player from "./lib/Player.js";
import MiniMap from "./lib/MiniMap.js";

// init canvas
let canvas = document.getElementById('canvas');
canvas.setAttribute("width", 512);
canvas.setAttribute("height", 512);
canvas.style.background = "#2c3e50";
let ctx = canvas.getContext('2d');

// vars
const level = new Level();
const player = new Player(512/2, 512/2, "#8e44ad");
const minimap = new MiniMap(level.bgTiles, 2, canvas.width - 74, 10, {x:player.x, y: player.y});

// init level
level.createTiles();

// game loop
function loop() {
	requestAnimationFrame(loop);

	// update player
	player.update();

	// update level cam
	level.x -= player.vx;
	level.y -= player.vy;

	// collision
	level.bgTiles.forEach((row, y) => {
		row.forEach((tile, x) => {
			if (tile.id === 1 || tile.id === 2) {
				let newCenterX = (tile.x + level.x) + tile.halfWidth;
				let newCenterY = (tile.y + level.y) + tile.halfHeight;
				let updatedTile = { ...tile, centerX: newCenterX, centerY: newCenterY}
				let collision = rectangleCollision(player, updatedTile);
				if (collision.hit) {
					if (collision.side === "left" || collision.side === "right") {
						level.x += player.vx;
					}
					if (player.vy < 0) {
						if (collision.side === "top") {
							level.y += player.vy;
							player.vy = 0;
						}
					} 
					if(player.vy >= 0) {
						if (collision.side === "bottom") {
							level.y += player.vy;
							player.isGround = true;
							player.vy = 0;
						}
					}
				}
			}
		})
	})

	player.checkGround();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	level.draw(ctx);
	player.draw(ctx);
	minimap.draw(ctx, player);
}

loop();






