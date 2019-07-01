w = 50;
grid = [];
stack = [];



function setup(){
	createCanvas(600,600)
	rows = floor(height/w);
	cols = floor(width/w);
	
	for (var i = 0; i < rows; i++){
		for (var j = 0; j< cols; j++){
			grid.push(new Cell(i,j));
		}
	}
	
	current = grid[0];
	
}


function draw(){
	background(255)
	for (var i = 0; i< grid.length; i++){
		grid[i].show();
	}
	current.visited = true;
	current.highlight();
	var next = current.checkNeighbors();
	
	
	
	if (next){
		stack.push(current);
		
		next.visited = true;
		removeWalls(current, next);
		
		current = next;
	}
	else if(stack.length > 0){
		current = stack.pop();
		
	}
	
}


function removeWalls(a,b){
	var i = a.x - b.x;
	if (i === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}
	if (i === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}
	var j = a.y - b.y;
	if (j === -1){
		a.walls[2] = false;
		b.walls[0] = false;
	}
	if (j === 1){
		a.walls[0] = false;
		b.walls[2] = false;
	}	
	
}

function Cell(x,y){
	this.x = x;
	this.y = y;
	this.visited = false;
	this.walls = [true,true,true,true];
	
	this.index = function(x,y){
		if (x <0 | y < 0 | x > rows-1 | y > cols-1){
			return -1;
		}
		return y + x * cols; 
	}
	
	this.checkNeighbors = function(){
		var neighbors = [];
		
		var Top = grid[this.index(x, y-1)];
		var right = grid[this.index(x+1, y)];
		var bottom = grid[this.index(x, y+1)];
		var left = grid[this.index(x-1,y)];
		
		if (Top && !Top.visited){
			neighbors.push(Top);
		}
		if (right && !right.visited){
			neighbors.push(right);
		}
		
		if (bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		
		if (left && !left.visited){
			neighbors.push(left);
		}
		
		if (neighbors.length >0){
			for (var i = 0; i<neighbors.length; i++){
				var rand = floor(random(0, neighbors.length));
				return neighbors[rand];
			}
		}
		else{
			return undefined;
		}
		
		
	}
	
	
	this.show = function(){
		var i = x*w
		var j = y*w
		noFill();
		stroke(4);
		if (this.walls[0]){
			line(i,j,i+w,j);
		}
		if (this.walls[1]){
			line(i+w,j,i+w,j+w);
		}
		if (this.walls[2]){
			line(i+w,j+w,i,j+w);
		}
		if (this.walls[3]){
			line(i,j+w ,i,j);
		}
		
		if (this.visited){
			noStroke();
			fill(255,0,0,50);
			rect(i,j,w,w);
		}
		
	}
	
	this.highlight = function(){
		var i = x*w;
		var j = y*w;
		noStroke();
		fill(0,0,255,50);
		rect(i,j,w,w);
	}
	
}