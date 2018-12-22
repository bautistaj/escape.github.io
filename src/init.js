var game = new Phaser.Game(1136, 640, Phaser.CANVAS, 'game');

game.state.add('Menu', Menu);
game.state.add('PlayGame', PlayGame);
game.state.add('GameOver', GameOver);

game.state.start('Menu');
