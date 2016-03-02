var Game = function(columns, rows, minesCount, view){
  this.columns = columns;
  this.rows = rows;
  this.minesCount = minesCount;
  this.grid = [];
  this.view = view;
  this.exposedSquares = 0;
  this.win = false;
  this.lose = false;
  this.neededSquaresToWin = (rows * columns) - minesCount;
  this.populateGrid();
}

Game.prototype.neighbors = function(row, column) {
  var neighbors = [];
  for(var rowIndex = row-1 ; rowIndex <= row+1 ; rowIndex++ ){
    for(var columnIndex = column-1; columnIndex <= column +1; columnIndex++){
      
      if(this.grid[rowIndex]){
        var square = this.grid[rowIndex][columnIndex];
        if(square && !(row == rowIndex && column == columnIndex)){
          neighbors.push(square);
        }
      }
    }
  }
  return neighbors;
}

Game.prototype.gameOver = function(){
  this.lose = true;
  this.win = false;
  if(this.view){
    this.view.gameOver()
  }
}

Game.prototype.status = function(){
  if(this.win){
    return 'win';
  }
  if(this.lose){
    return 'lose';
  }
  return 'on';
}

Game.prototype.createSquares = function(){
  var mineIndexies = this.createMineIndixies();

  while(mineIndexies.length + 1 <= this.minesCount){
    var randomIndex = Math.floor(Math.random() * this.columns * this.rows);
    if(mineIndexies.indexOf(randomIndex) == -1){
      mineIndexies.push(randomIndex);
    }
  }

  var grid = [];
  var index = 0;

  for(var rowIndex = 0; rowIndex < this.rows; rowIndex++){
    var row = [];
    for(var columnIndex = 0; columnIndex < this.columns; columnIndex++){
      index++;

      var hasMine = mineIndexies.indexOf(index) >= 0;
      var square = new Square(hasMine, this);
      row.push(square);
    }
    grid.push(row);
  }

  return grid;
}

Game.prototype.createMineIndixies = function(){
  var mineIndexies = [];

  while(mineIndexies.length + 1 <= this.minesCount){
    var randomIndex = Math.floor(Math.random() * this.columns * this.rows);
    if(mineIndexies.indexOf(randomIndex) == -1){
      mineIndexies.push(randomIndex);
    }
  }
  return mineIndexies;
}

Game.prototype.openSquares = function(){
  var squares = [];

  for(var rowIndex = 0; rowIndex < this.rows; rowIndex++){
    for(var columnIndex = 0; columnIndex < this.columns; columnIndex++){
      var square = this.grid[rowIndex][columnIndex];
      if(!square.exposed){
        squares.push(square);
      }
    }
  }

  return squares;
}

Game.prototype.calculateSquares = function(){
  for(var rowIndex = 0; rowIndex < this.rows; rowIndex++){
    for(var columnIndex = 0; columnIndex < this.columns; columnIndex++){
      var square = this.grid[rowIndex][columnIndex];
      square.neighbors = this.neighbors(rowIndex, columnIndex);
      square.calculateNumber();
    }
  }
}

Game.prototype.squareExposed = function(){
  this.exposedSquares++;
  if(this.exposedSquares >= this.neededSquaresToWin){
    this.win = true;

    if(this.view){
      this.view.gameWin();
    }
  }
}

Game.prototype.populateGrid = function(){
  this.grid = this.createSquares();
  this.calculateSquares();
}

var Square = function(hasMine, game){
  this.hasMine = hasMine;
  this.number = 0;
  this.exposed = false;
  this.game = game;
}

Square.prototype.calculateNumber = function(){
  if(this.hasMine){
    this.number = 0;
    return
  }
  this.number = this.neighbors.reduce(function(memo, neighbor){
    var number = (neighbor.hasMine) ? 1 : 0;
    return memo + number;
  },0)
}

Square.prototype.expose = function(exposedSquares){
  exposedSquares = exposedSquares || [];
  
  exposedSquares.push(this);

  if(this.hasMine){
    this.game.gameOver();
    return
  }else{
    if(!this.exposed){
      this.exposed = true;
      this.game.squareExposed();
    }
  }

  if(this.number == 0){
    for(var i in this.neighbors){
      var neighborSquare = this.neighbors[i];

      if(exposedSquares.indexOf(neighborSquare) == -1){
        neighborSquare.expose(exposedSquares);
      }
    }
  }
  // simple event
  if(this.view){
    this.view.render();
  }
}
