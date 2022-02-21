import { colors } from "./utils.js";

export class MiniMap {
	constructor(map, scale, x, y, point) {
		this.scale = scale;
		this.arr2d = map;
		this.x = x;
		this.y = y;
		this.point = point;
	}
	draw(ctx, player) {
		ctx.save();
		ctx.globalAlpha = 0.6;
		this.arr2d.forEach((row, y) => {
			row.forEach((tile, x) => {
				ctx.beginPath();
				ctx.fillStyle = tile.id === 1 ? colors[1] : colors[2];
				ctx.rect((x*this.scale) + this.x, (y*this.scale) + this.y, this.scale, this.scale);
				ctx.fill();
			})
		})
		// update oint position
		this.point.x += player.vx;
		this.point.y += player.vy;
		// draw player point
		ctx.beginPath();
		ctx.fillStyle = colors[6];
		ctx.rect((this.point.x/16) + this.x, (this.point.y/16) + this.y, this.scale, this.scale);
		ctx.fill();

		ctx.restore();
	}
}

export default MiniMap;