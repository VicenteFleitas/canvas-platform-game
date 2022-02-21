import { colors } from "./utils.js";
import Tile from "./Tile.js";
import { createMap } from "./cellularAtomata.js";

export class Level {
	constructor () {
		this.tw = 32;
		this.bgTiles = [];
		this.x = 0;
		this.y = 0;
		this.matrix = createMap(15);
	}
	createTiles() {
		this.matrix.forEach((row, y) => {
			let arr = [];
			row.forEach((id, x) => {
				let tile = new Tile(id ? 1 : 3, x * this.tw, y * this.tw, this.tw, this.tw);
				arr.push(tile);
			})
			this.bgTiles.push(arr);
		})
	}
	draw(ctx) {
		this.bgTiles.forEach((row, y) => {
			row.forEach((tile, x) => {
				ctx.beginPath();
				ctx.fillStyle = colors[tile.id];
				ctx.rect(tile.x + this.x, tile.y + this.y, tile.w, tile.h);
				ctx.fill();
			})
		})
	}

}

export default Level;