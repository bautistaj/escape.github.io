var style = {
  font: 'bold 30pt Arial',
  fill: '#000000',
  align: 'center'
}

var Menu = {
    init: function(){
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    },
    preload: function(){
        game.load.image('button', 'assets/images/btn.png');
        game.load.image('background_init', 'assets/images/grinch.png');
    },

    create: function(){
      this.add.button(game.width/2, game.height/2,
        'background_init').anchor.setTo(0.5);

        var button = this.add.button(game.width/2, 500,
          'button', this.startGame, this);

        button.anchor.setTo(0.5);

        this.textInstructions =  game.add.text(game.width/2, 410, "Help the Grinch escape, collect stars and avoid trees", style);
        this.textInstructions.anchor.setTo(0.5);
    },
    startGame: function(){
        this.state.start('PlayGame');
        console.log(game);
    }
};
