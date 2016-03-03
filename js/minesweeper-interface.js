var icons = {
  blank: 'http://i.imgur.com/HM1e3Tbb.jpg',
  pressed: 'http://i.imgur.com/bGT8xGEb.jpg',
  exposedBomb: 'http://i.imgur.com/pTJ8Swhb.jpg',
  explodedBomb: 'http://i.imgur.com/UFmXprFb.jpg',
  flag: 'http://i.imgur.com/nLPvW15b.jpg',
  // Index is # of adjacent bombs
  bombs: [
    'http://i.imgur.com/Flqdqi1b.jpg', // 0
    'http://i.imgur.com/bM8oExob.jpg', // 1
    'http://i.imgur.com/bQKSbqYb.jpg', // 2
    'http://i.imgur.com/5jNcEeVb.jpg', // 3
    'http://i.imgur.com/BnxjHgHb.jpg', // 4
    'http://i.imgur.com/RaFrMYcb.jpg', // 5
    'http://i.imgur.com/GlwQOy0b.jpg', // 6
    'http://i.imgur.com/8ngsVa8b.jpg', // 7
    'http://i.imgur.com/lJ8P1wab.jpg'  // 8
  ]
};

var SquareView = Backbone.View.extend({
  className: 'square',
  tagName: 'span',

  events: {
    'click':'onClick'
  },

  initialize: function(square){
    square.view = this; // simple event binding
    this.square = square;
  },

  render: function(){
    var icon = 'blank';
    if(this.square.exposed){
      if(this.square.exploded){
        icon = icons.explodedBomb;
      }else if(this.square.hasMine){
        icon = icons.exposedBomb;
      }else{
        icon = icons.bombs[this.square.number];
      }

    }else{
      icon = icons.blank;
    }
    $(this.el).html("<img height=20 width=20 src='"+icon+"' />");
  },

  onClick: function(){
    this.square.expose() ;
  }
});

var GameView = Backbone.View.extend({
  events:{
    'click .reset' : 'onResetClick'
  },

  initialize: function(options){
    this.createNewGame();
  },

  createNewGame: function(){
    this.game = new Game(10,10,10, this);
  },

  onResetClick: function(){
    this.createNewGame();
    this.render();
    $(this.el).find('.status').html('')
  },

  gameOver: function(){
    $(this.el).find('.status').html('LOSE')
  },

  gameWin: function(){
    $(this.el).find('.status').html('WIN')
  },

  render: function(){
    var html = $('<div>');

    for(var rowIndex = 0; rowIndex < this.game.rows; rowIndex++){
      var row = $('<div class="row">');
      for(var columnIndex = 0; columnIndex < this.game.columns; columnIndex++){
        var square = this.game.grid[rowIndex][columnIndex];
        var squareView = new SquareView(square);
        squareView.render();
        row.append(squareView.el);

      }
      html.append(row);
    }
    html.append('<button class="reset">RESET</button>')
    html.append('<h2 class="status"></h2>');
    $(this.el).html(html);
  }

});