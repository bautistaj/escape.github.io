var GameOver = {

    preload: function(){
        game.load.image('button', 'assets/images/btn.png');
        game.load.image('background_init', 'assets/images/grinch.png');
    },

    create: function(){
      this.add.button(game.width/2, game.height/2,
        'background_init').anchor.setTo(0.5);
        var button = this.add.button(game.width/2,
          game.height/2, 'button',
          this.startGame, this);

        button.anchor.setTo(0.5);

        /*
        var txtPuntosEtiqueta = juego.add.text(juego.width/2 -50, juego.height/2 -85, "Puntos: ", {font: "bold 20px sans-serif", fill:"black", align:"center"});
        txtPuntosEtiqueta.anchor.setTo(0.5);
        if(puntos == -1)
            puntos = 0;
        var txtPuntosNumero = juego.add.text(juego.width/2 +50, juego.height/2 -85, puntos.toString(), {font: "bold 20px sans-serif", fill:"black", align:"center"});
        txtPuntosNumero.anchor.setTo(0.5);
        var txtTitulo = juego.add.text(juego.width/2, juego.height/2 -125, "Juego terminado", {font: "bold 30px sans-serif", fill:"black", align:"center"});
        txtTitulo.anchor.setTo(0.5);
        */
    },
    startGame: function(){
        this.state.start('PlayGame');
        console.log(game);
    }
};
