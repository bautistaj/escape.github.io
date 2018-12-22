var AMOUNT_TREE = 3;
var AMOUNT_STAR = 10;

var style = {
  font: 'bold 30pt Arial',
  fill: '#59c14f',
  align: 'center'
}

var styleMap = {
  font: 'bold 60pt Arial',
  fill: '#59c14f',
  align: 'center'
};

var PlayGame = {

    init: function(){
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      this.startCaugth = 0;
      this.grinchLive = 100;
      this.isLive = true;
    },
    preload: function(){
        game.load.image('background', 'assets/images/fondo.png');
        game.load.spritesheet('grinch', 'assets/images/trineo.png',478.5, 160, 1);
        game.load.spritesheet('tree', 'assets/images/arbol.png');
        game.load.spritesheet('star', 'assets/images/estrella.png');
        game.load.spritesheet("explosion","assets/images/explosion.png",81, 84, 4);
        game.load.spritesheet("explosion2","assets/images/explosion2.png",81, 84, 4);
        game.load.image('button', 'assets/images/btn.png');
        game.load.audio('oedipus', ['assets/sounds/oedipus.mp3']);
        game.load.audio('sfxPop', ['assets/sounds/sfxPop.mp3']);
        game.load.audio('explosion', ['assets/sounds/explosion.mp3']);
    },

    create: function(){
      background = game.add.tileSprite(0, 0, 1136, 640, 'background');

      this.treeArray = [];
      this.treeStatus = [];
      for(var i = 0; i < AMOUNT_TREE; i++){
        var xTree = game.rnd.integerInRange(100, 900);
        var yTree = game.rnd.integerInRange(-500, -950);
        var tree = game.add.sprite(xTree, yTree, 'tree');

        var rand = game.rnd.realInRange(.2, 1);
        tree.scale.setTo(rand, rand);
        tree.vel = 10;

        this.treeArray[i] = tree;
        this.treeStatus[i] = true;
        var currentTree = this.getBoundsSprite(tree);

        while( this.isOverlappingOtherSprite(i, currentTree, true) ){
          tree.x = game.rnd.integerInRange(100, 900);
          tree.y = game.rnd.integerInRange(-600, -950);
          currentTree = this.getBoundsSprite(tree);
          this.treeStatus[i] = false;
        }
      }

      this.starArray = [];
      this.starStatus = [];
      for(var i = 0; i < AMOUNT_STAR; i++){
        var xStar = game.rnd.integerInRange(100, 900);
        var yStar = game.rnd.integerInRange(-500, -950);
        var star = game.add.sprite(xTree, yTree, 'star');
        star.vel = 10;
        this.starArray[i] = star;
        this.starStatus[i] = true;
        var currentStar = this.getBoundsSprite(star);

        while( this.isOverlappingOtherSprite(i, currentStar, false) ){
          star.x = game.rnd.integerInRange(100, 900);
          star.y = game.rnd.integerInRange(-500, -950);
          currentStar = this.getBoundsSprite(star);
          this.starStatus[i] = false;
        }
      }


      this.explosionGroup = game.add.group();
      for(var i = 0; i < 10; i++){
        this.explosion = this.explosionGroup.create(100,100,'explosion');
        this.explosion.tweenScale = game.add.tween(this.explosion.scale).to({
          x:[0.4,0.8,0.4],
          y:[0.4,0.8,0.4]
        }, 600, Phaser.Easing.Exponential.Out, false, 0,0,false);

        this.explosion.tweenAlpha = game.add.tween(this.explosion).to({
          alpha:[1, 0.6, 0]
        }, 600, Phaser.Easing.Exponential.Out, false, 0,0,false);

        this.explosion.anchor.setTo(0.5);
        this.explosion.kill();
      }

      this.explosionGroup2 = game.add.group();
      for(var i = 0; i < 10; i++){
        this.explosion2 = this.explosionGroup2.create(100,100,'explosion2');
        this.explosion2.tweenScale = game.add.tween(this.explosion2.scale).to({
          x:[0.8,1,0.3],
          y:[0.8,1,0.3]
        }, 600, Phaser.Easing.Exponential.Out, false, 0,0,false);

        this.explosion2.tweenAlpha = game.add.tween(this.explosion2).to({
          alpha:[1, 0.6, 0]
        }, 600, Phaser.Easing.Exponential.Out, false, 0,0,false);

        this.explosion2.anchor.setTo(0.5);
        this.explosion2.kill();
      }

      this.grinch = game.add.sprite(game.width/2, game.height/2,
          'grinch');

      this.grinch.anchor.setTo(0.5,0.5);


      //text score
      this.scoreText = game.add.text(100, 40, 'Starts: 0', style);
      this.scoreText.anchor.setTo(0.5);

      this.liveText = game.add.text(1035, 40, 'Live: 100', style);
      this.liveText.anchor.setTo(0.5);

      //sounds

      this.music = game.add.audio('oedipus');

      this.explosion = game.add.audio('explosion');
      this.sfxPop = game.add.audio('sfxPop');

      this.music.play();
    },
    update: function(){
      background.tilePosition.y += 10;
      if(this.isLive){
        //move grinch init segment
        var pointerX = game.input.x;
        var pointerY = game.input.y;

        var distX = pointerX - this.grinch.x;
        var distY = pointerY - this.grinch.y;

        this.grinch.angle = distX > 0 ? 10 : -10 ;
        this.grinch.x += distX * 0.15;
        this.grinch.y += distY * 0.15;
        //move grinch finish segment


        for (var i = 0; i < AMOUNT_TREE; i++) {
          var tree = this.treeArray[i];
          tree.y += this.treeStatus[i] ? tree.vel : 0;

          if(tree.y > 600){
            tree.y = -500;
            tree.x = game.rnd.integerInRange(30, 1000);
          }
        }

        for (var i = 0; i < AMOUNT_STAR; i++) {
          var star = this.starArray[i];
          star.y += this.starStatus[i] ? star.vel : 0;

          if(star.y > 600){
            star.y = -500;
            star.x = game.rnd.integerInRange(30, 1000);
          }
        }

        // collision star
        for(var i = 0; i < AMOUNT_STAR; i++){
          var boundGrinch = this.getBoundsSprite(this.grinch);
          var boundStar = this.getBoundsSprite(this.starArray[i]);

          if( this.starArray[i].visible && this.isSpriteOverlapping(boundGrinch, boundStar) ) {
            this.increaseScore();
            this.sfxPop.play();
            var explosion = this.explosionGroup.getFirstDead();
            if(explosion != null){
              explosion.reset(this.starArray[i].x, this.starArray[i].y);
              explosion.tweenScale.start();
              explosion.tweenAlpha.start();

              explosion.tweenAlpha.onComplete.add(function (currentTarget, currentTween){
                currentTarget.kill();
              }, this);
            }

            this.starArray[i].kill;
            this.starArray[i].reset(game.rnd.integerInRange(100, 900),
            game.rnd.integerInRange(-500, -950));
          }
        }

        //Collision tree
        for(var i = 0; i < AMOUNT_TREE; i++){
          var boundGrinch = this.getBoundsSprite(this.grinch);
          var boundTree = this.getBoundsSprite(this.treeArray[i]);

          if( this.isSpriteOverlapping(boundGrinch, boundTree) ) {
            this.removeLive();
            this.explosion.play();
            var explosion = this.explosionGroup2.getFirstDead();
            if(explosion != null){
              explosion.reset(this.treeArray[i].x, this.treeArray[i].y);
              explosion.tweenScale.start();
              explosion.tweenAlpha.start();

              explosion.tweenAlpha.onComplete.add(function (currentTarget, currentTween){
                currentTarget.kill();
              }, this);
            }

            this.treeArray[i].kill;
            this.treeArray[i].reset(game.rnd.integerInRange(100, 900),
            game.rnd.integerInRange(-600, -950));
          }
        }
      }
    },
    getBoundsSprite: function(currentSprite){
      return new Phaser.Rectangle(currentSprite.left,
        currentSprite.top,
        currentSprite.width,
        currentSprite.height);
    },
    isOverlappingOtherSprite: function(index, sprite2, isTree){
      for(var i = 0; i < index; i++){

        var sprite1 = isTree ? this.getBoundsSprite(this.treeArray[i]) :
        this.getBoundsSprite(this.starArray[i]);

        if(this.isSpriteOverlapping(sprite1, sprite2)){
          return true;
        }
      }
    },
    isSpriteOverlapping:function(sprite1, sprite2){
      if(sprite1.x > sprite2.x+sprite2.width || sprite2.x > sprite1.x+sprite1.width){
        return false;
      }
      if(sprite1.y > sprite2.y+sprite2.height || sprite2.y > sprite1.y+sprite1.height){
        return false;
      }
      return true;
    },
    increaseScore: function(){
      this.scoreText.text =  'Starts: '+this.startCaugth;
      if(this.startCaugth < 100)
        this.startCaugth+=10;
      else
        this.gameOver("CONGRATULATIONS");
    },
    removeLive: function(){
      if(this.grinchLive > 5){
        this.grinchLive-=5;
        this.liveText.text =  'Live: '+this.grinchLive;
      }else{
        this.gameOver("GAME OVER");
      }
    },
    gameOver: function(message){
        this.music.stop();
        this.isLive = false;
        this.showFinalMessage(message);
    },
    showFinalMessage: function(message){
      var bitMap = game.add.bitmapData(game.width, game.height);

      bitMap.ctx.fillStyle = '#000000';
      bitMap.ctx.fillRect(0,0,game.width, game.height);

      var bg = game.add.sprite(0,0,bitMap);
      bg.alpha = 0.5;

      this.textFieldFinalMsg =  game.add.text(game.width/2, 200, message, styleMap);
      this.textFieldFinalMsg.anchor.setTo(0.5);

      this.textFieldFinalMsgTry =  game.add.text(game.width/2, 300, "Try again", styleMap);
      this.textFieldFinalMsgTry.anchor.setTo(0.5);

      var button = this.add.button(game.width/2, 450,
        'button', this.startGame, this);

      button.anchor.setTo(0.5);
    },
    startGame: function(){
        this.state.start('PlayGame');
        console.log(game);
    }
};
