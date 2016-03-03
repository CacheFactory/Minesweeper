var Game = require('./minesweeper.js')
var GameSolver = require('./game-solver.js')

var calculate = function(runs) {
  var wins = 0

  var startDate = new Date();

  for(var i=0; i< runs; i++){
    var game = new Game(10,10,10)
    var solver = new GameSolver(game)
    if(solver.solve()){
      wins++;
    }
  }

  var endDate = new Date();
  console.log("Win/lose: "+ wins/runs)
  console.log("Time (seconds): "+ (endDate.getTime() - startDate.getTime())/ 1000)
};

calculate(parseInt(process.argv[2]));