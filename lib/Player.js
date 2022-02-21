class Player {
	constructor (x, y, color) {
		this.color = color;
		this.keys = {};
		this.isGround = false;
		this.acceleration = 1; 
		this.jumpSpeed = 12;
		this.x = x; 
		this.y = y; 
		this.w = 32; 
		this.h = 32; 
		this.vx = 0; 
		this.vy = 0; 
		this.speed = 4;
		this.halfWidth = 32/2; 
		this.halfHeight = 32/2;
		// add listeners
		window.addEventListener("keydown", e => {
			console.log("ok")
			this.keys[e.keyCode] = true;
			if (e.key === "k") {
				if (this.isGround) {
					this.vy = -this.jumpSpeed;
					this.isGround = false;
				}
			}
		})
		window.addEventListener("keyup", e => {
			this.keys[e.keyCode] = false;
		})
	}
	get centerX() {
		return this.x + this.halfWidth;
	}
	get centerY() {
		return this.y + this.halfHeight;
	}
	update() {
		// keys
		if(this.keys[65]){
			this.vx = -this.speed;
		} else if(this.keys[68]){
			this.vx = this.speed;
		} else {
			this.vx = 0;
		}
		// logic
		this.vy += this.acceleration;
	}
	checkGround() {
		// vertical velocity check
		if(this.vy !== 0) {
			this.isOnGround = false;
		}
		// always on ground if player dont have gravity
		if(this.acceleration === 0){
			this.isOnGround = true;
		}
	}
	draw (ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.fill();
	}
}

export default Player;