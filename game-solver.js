
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
      var sum = square.neighbors.reduce(function(memo, square){
        if(square.exposed){
          return memo + square.number;
        }else{
          return memo;
        }
      },0)
      sum = sum;
      squareSums[sum] = square;
    }

    var keys = _.keys(squareSums);
    var leastKey = Array.min(keys);
    var squareToPick = squareSums[leastKey];
    
    squareToPick.expose();
  }

  var win = this.game.status() == 'win';
  return win;
}
