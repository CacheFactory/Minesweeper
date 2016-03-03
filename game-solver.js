
Array.min = function( array ){
  return Math.min.apply( Math, array );
};
var GameSolver = function(game){
  this.game = game;
}

GameSolver.prototype.solve = function(){
  while(this.game.status() == 'on'){
    var squareSums = {};
    var openSquares = this.game.openSquares();
    for(var i in openSquares){
      var square = openSquares[i];
      var exposedCount = 0;
      var sum = 0;
      var neighborsCount = square.neighbors.length;

      for(var j in square.neighbors){
        var neighborSquare = square.neighbors[j]
        if(neighborSquare.exposed){
          exposedCount++
          sum = sum + square.number
        }
      }

      var probability = (exposedCount - sum) /neighborsCount
      squareSums[probability] = square;
    }

    var keys = _.keys(squareSums);
    var leastKey = Array.min(keys);
    var squareToPick = squareSums[leastKey];
    
    squareToPick.expose();
  }

  var win = this.game.status() == 'win';
  return win;
}
