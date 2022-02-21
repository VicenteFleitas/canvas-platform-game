export const colors = [ null, "#16a085", "#d35400", "#2983b9", "#34495e", "#7f8c8d", "#27ae63" ]; 

export function rectangleCollision(r1, r2) {

  let hit, side, combinedHalfWidths, combinedHalfHeights,
    overlapX, overlapY, vx, vy;

    hit = false;
    side = "none";

  //Calculate the distance vector
	vx = r1.centerX - r2.centerX;
	vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check whether vx is less than the combined half widths
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring!
    //Check whether vy is less than the combined half heights
    if (Math.abs(vy) < combinedHalfHeights) {

      //A collision has occurred! This is good!
      //Find out the size of the overlap on both the X and Y axes
      overlapX = combinedHalfWidths - Math.abs(vx);
      overlapY = combinedHalfHeights - Math.abs(vy);

      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
      hit = true;
      if (overlapX >= overlapY) {
        //The collision is happening on the X axis
        //But on which side? vy can tell us

        if (vy > 0) {
          side = "top";
          //Move the rectangle out of the collision
          // r1.y = r1.y + overlapY;
        } else {
          side = "bottom";
          //Move the rectangle out of the collision
          // r1.y = r1.y - overlapY;
        }

      } else {
        //The collision is happening on the Y axis
        //But on which side? vx can tell us

        if (vx > 0) {
          side = "left";
          //Move the rectangle out of the collision
          // r1.x = r1.x + overlapX;
        } else {
          side = "right";
          //Move the rectangle out of the collision
          // r1.x = r1.x - overlapX;
        }
      }
    } else {
      //No collision
      hit = false;
      side = "none";
    }
  } else {
    //No collision
    hit = false;
    side = "none";
  }

  //Return the collision string. it will be either "top", "right",
  //"bottom", or "left" depending on which side of r1 is touching r2.
  return {hit: hit, side: side};
}