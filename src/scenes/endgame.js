class endgame extends Phaser.Scene {
    constructor() {
        super("endgameclass");
        this.my = {
            audio: {}
        };
    }
   
    preload(){
        this.load.setPath("./assets");
        this.load.audio("BUTTON CLICK", "button_click_sound.m4a");
    }

    create() {
        let movementScene = this.scene.get('movementclass');
        let my = this.my;
          
        
            // Add "Game Over" text with pixelated font
            if(movementScene.game_over){
            const gameOverText = this.add.text(500, 400, 'Game Over', {
                fontSize: '100px',
                fontFamily: 'Press Start 2P',
                fill: '#fff',
                
            }).setOrigin(0.5);
            gameOverText.setScale(5);
            my.audio.BUTTON_CLICK = this.sound.add("BUTTON CLICK");
        }
        
        else{
                const gameOverText = this.add.text(500, 400, 'You Won!', {
                    fontSize: '100px',
                    fontFamily: 'Press Start 2P',
                    fill: 'green',
                    
                }).setOrigin(0.5);
                gameOverText.setScale(5);

        }
            
            const restartButton = this.add.text(500, 500, 'Restart', {
                fontSize: '300px',
                fontFamily: 'Press Start 2P',
                fill: '#fff',
                backgroundColor: '#4CAF50',
        
                padding: {
                    left: 40,
                    right: 40,
                    top: 10,
                    bottom: 10
                },
            }).setOrigin(0.5).setScale(2);
        
        
            
            restartButton.setInteractive();
        

            restartButton.on('pointerdown', () => {
                my.audio.BUTTON_CLICK.play();
                this.scene.stop('endgameclass');
                this.scene.start('movementclass');
                movementScene.resetGame();
            });
        }
    }
    