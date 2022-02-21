const tw = 32;
const birthLimit = 4;
const deathLimit = 3;
const chanceToStartAlive = 0.4;
const width = 32;
const height = 32;

// createMap(15);

export function createMap(numberOfSteps){
    //Create map
    let cellmap = Array(width).fill(null).map(()=>Array(height).fill(false));
    //Set random values
    cellmap = initMap(cellmap);
    //run
    for(let i = 0; i < numberOfSteps; i++){
        cellmap = applyCA(cellmap);
    }
    return cellmap;
}

function initMap(arr2d){
	for(let y = 0; y < width; y++){
		for(let x = 0; x < height; x++){
			if(Math.random() < chanceToStartAlive){
				arr2d[x][y] = true;
			}
		}
	}
    return arr2d;
}

function applyCA(oldMap){
    let newMap = Array(width).fill(null).map(()=>Array(height).fill(false));
    //Loop over each row and column of the map
    for(let x = 0; x < oldMap.length; x++){
        for(let y = 0; y < oldMap[0].length; y++){
            let nbs = countAliveCell(oldMap, x, y);
            //The new value is based on our simulation rules
            //First, if a cell is alive but has too few neighbours, kill it.
            if(oldMap[x][y]){
                if(nbs < deathLimit){
                    newMap[x][y] = false;
                }
                else{
                    newMap[x][y] = true;
                }
            } //Otherwise, if the cell is dead now, check if it has the right number of neighbours to be 'born'
            else{
                if(nbs > birthLimit){
                    newMap[x][y] = true;
                }
                else{
                    newMap[x][y] = false;
                }
            }
        }
    }
    return newMap;
}

function countAliveCell(arr2d, x, y){
    let count = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            let neighbour_x = x + i;
            let neighbour_y = y + j;
            //If middle point
            if(i === 0 && j === 0){
                //Do nothing,
            }
            //In case the index we're looking at it off the edge of the map
            else if(neighbour_x < 0 || neighbour_y < 0 || neighbour_x >= arr2d.length || neighbour_y >= arr2d[0].length){
                count = count + 1;
            }
            //Otherwise, a normal check of the neighbour
            else if(arr2d[neighbour_x][neighbour_y]){
                count = count + 1;
            }
        }
    }
    return count;
}