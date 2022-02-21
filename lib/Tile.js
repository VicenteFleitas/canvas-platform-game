class Tile {
	constructor(id, x, y, w, h) {
		this.id = id;
		this.x = x;
		this.y = y; 
		this.w = w;
		this.h = h;
		this.halfWidth = w / 2; 
		this.halfHeight = h / 2;
	}
	get centerX() {
		return this.x + this.halfWidth;
	}
	get centerY() {
		return this.y + this.halfHeight;
	}
}

export default Tile;