var Game = require('../js/minesweeper.js')

describe('Minesweeper', function(){
  it("should create a board", function() {
    var game = new Game(10,10,5)
    expect(game.columns).toBe(10);
    expect(game.rows).toBe(10);
    expect(game.neededSquaresToWin).toBe(95);
  });

  it("should win when all squares have been exposed", function() {
    var game = new Game(10,10,1)
    
    for(var r in game.grid){
      for(var c in game.grid[r]){
        var square = game.grid[r][c]
        if(!square.hasMine){
          square.expose()
        }
      }
    }
    expect(game.lose).toBe(false)
    expect(game.win).toBe(true)
  });

  it("should lose when a squares have been exposed that has a bomb", function() {
    var game = new Game(10,10,1)
    
    for(var r in game.grid){
      for(var c in game.grid[r]){
        var square = game.grid[r][c]
        if(square.hasMine){
          square.expose()
        }
      }
    }

    expect(game.win).toBe(false)
    expect(game.lose).toBe(true)
  });

  it("should display all mines on lose", function() {
    spyOn(Game.prototype, 'createMineIndixies').and.returnValue([1,2,3,4,5])
    var game = new Game(10,10,5)
    game.grid[0][1].expose()

    expect(game.win).toBe(false)
    expect(game.lose).toBe(true)

    for(var r in game.grid){
      for(var c in game.grid[r]){
        var square = game.grid[r][c]
        expect(square.exposed).toBe(true)
      }
    }
  });

  it("should calculate neighboring squares correctly", function() {
    var game = new Game(10,10,10)
    
    for(var r in game.grid){
      for(var c in game.grid[r]){
        var square = game.grid[r][c]
        
        var expectedNumber = square.neighbors.reduce(function(memo, neighbor){
          var number = (neighbor.hasMine) ? 1 : 0;
          return memo + number;
        },0)
        if(square.hasMine){
          expect(square.number).toBe(0)
        }else{
          expect(square.number).toBe(expectedNumber)
        }
        
      }
    }
  });

  it("should expose neighboring squares correctly", function(){
    spyOn(Game.prototype, 'createMineIndixies').and.returnValue([1,2,3,4,5])
    var game = new Game(10,10,5)
    game.grid[8][8].expose()
    expect(game.openSquares().length).toBe(5)
  })

})
