class movementclass extends Phaser.Scene {
    constructor() {
        super("movementclass");

        this.my = {
            sprite: {},
            audio: {}
        };
        this.my.sprite.bullet = [];
        this.my.sprite.enemies = [];
        this.my.sprite.enemy_bullets = [];
        this.maxEnemies = 8;
        this.maxBullets = 10;
        this.delayBetweenShips = 500;
        this.red_turn = true;
        this.green_turn = false;
       // this.black_turn = false;
    }

    
    preload() {
        this.load.setPath("./assets");
        this.load.atlasXML("spaceship", "kenney_space-shooter-redux/Spritesheet/sheet.png", "kenney_space-shooter-redux/Spritesheet/sheet.xml");
        this.load.image("explosion00", "explosion_anim/explosion00.png");
        this.load.image("explosion01", "explosion_anim/explosion01.png");
        
        this.load.image("explosion02", "explosion_anim/explosion02.png");
        this.load.image("explosion03", "explosion_anim/explosion03.png");
        this.load.image("explosion04", "explosion_anim/explosion04.png");
        this.load.image("explosion05", "explosion_anim/explosion05.png");
        this.load.image("explosion06", "explosion_anim/explosion06.png");
        this.load.image("explosion07", "explosion_anim/explosion07.png");
        this.load.audio("CRASH", "collision_sound.m4a");
        this.load.audio("GAME OVER", "game_over_sound.m4a");
        this.load.audio("PEW", "PEW.m4a");
        this.load.image("lives", "heart.png");
        this.load.image("background", "game_background.png")
    }

    create() {
        let my = this.my;
        this.add.image(0, 0, 'background').setOrigin(0)

        this.points = [
            -100, -100,
            9, 35,
            198, 376,
            337, 407,
            394, 286,
            320, 243,
            147, 411,
            260, 561,
            467, 612,
            708, 616,
            2103, 610
        ];
        this.curve = new Phaser.Curves.Spline(this.points);

        this.points2 = [
            1000, -100,
            987, 47,
            834, 245,
            622, 342,
            462, 298,
            390, 238,
            218, 241,
            100, 313,
            121, 464,
            269, 480,
            413, 483,
            618, 483,
            677, 588,
            573, 589,
            268, 579,
            41, 579,
            -2000, 574

        ];

        this.points3 = [
            2000,103, 
            528,96,
            178,98,
            60,134,
            60,233,
            465,243,
            962,234,
            986,313,
            895,357,
            468,356,
            52,378,
            -1000,376
            ]

        
        this.curve3 = new Phaser.Curves.Spline(this.points3);
        this.curve2 = new Phaser.Curves.Spline(this.points2);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.lives = [];
        for(let i = 0; i < 3; i++){
        this.lives[i] = this.add.image(50 + i * 60, 750, "lives").setScale(.25);
        this.lives[i].setFrame("heart.png");
        }
       // console.log(this.lives);
        my.sprite.playersprite = this.add.sprite(500, 750, "spaceship");
        my.sprite.playersprite.setFrame("playerShip2_blue.png");
        my.audio.PEW = this.sound.add("PEW");
        my.audio.CRASH = this.sound.add("CRASH");
        my.audio.GAME_OVER = this.sound.add("GAME OVER");

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({
            key: "explosion",
            frames: [
                { key: "explosion00" },
                { key: "explosion01" },
                { key: "explosion02" },
                { key: "explosion03" },
                { key: "explosion04" },
                { key: "explosion05" },
                { key: "explosion06" },
                { key: "explosion07" }
            ],
            framerate: 30,
            repeat: 0,
            hideOnComplete: true
        });

        this.lastime = 0;
        this.last_bullet = 0;
        this.visible_cooldown = 0;

        
        for (let i = 0; i <= 7; i++) {
            if(i <= 3){
                my.sprite.enemies.push(this.add.follower(this.curve, this.curve.points[0].x, this.curve.points[0].y, "spaceship", "enemyRed2.png"));
            }
            else{
                my.sprite.enemies.push(this.add.follower(this.curve2, this.curve2.points[0].x, this.curve2.points[0].y, "spaceship", "enemyGreen2.png"));
            }
    }
    this.FirstWave();
    this.created_wave = false;
    this.deaths = 0;
    this.game_over = false;
    this.player_score = 0;
     this.ScoreText = this.add.text(900, 750, 'Score: ' + [this.player_score], {
        fontSize: '50px',
        fontFamily: 'Press Start 2P',
        fill: '#fff',
        
    }).setOrigin(0.5);
    this.ScoreText.setScale(2);
   
}

    FirstWave() {
        let my = this.my;
      //  if (this.red_turn) {
            for (let i = 0; i <= 3; i++) {
                my.sprite.enemies[i].startFollow({
                    from: 0,
                    to: 1,
                    delay: (i - 1) * this.delayBetweenShips, // Apply delay
                    duration: 8000,
                    ease: 'Sine.easeInOut',
                    repeat: -1,
                    yoyo: true,
                    rotateToPath: true,
                    rotationOffset: -90
                });
   
            this.red_turn = false;
            this.green_turn = true;

            for (let i = 4; i <= 7; i++) {
                
                my.sprite.enemies[i].startFollow({
                    from: 0,
                    to: 1,
                    delay: (i - 1) * this.delayBetweenShips, // Apply delay
                    duration: 8000,
                    ease: 'Sine.easeInOut',
                    repeat: -1,
                    yoyo: true,
                    rotateToPath: true,
                    rotationOffset: -90
                });
            }
       
        
        }
      
    }

        UpdateLives(){
            let index = Math.abs(2 - this.deaths);
            this.lives[index].visible = false;
            this.deaths ++;
            return;
        }

    CreateNewWave(){
        let my = this.my;
        if(this.created_wave === false){
            this.created_wave = true;
            for (let i = 0; i <= 5; i++) {
                my.sprite.enemies.push(this.add.follower(this.curve3, this.curve3.points[0].x, this.curve3.points[0].y, "spaceship", "enemyBlack2.png"));
        }
    }
}


    SecondWave(){
        let my = this.my;
              for (let i = 0; i <= 5; i++) {
                  my.sprite.enemies[i].startFollow({
                      from: 0,
                      to: 1,
                      delay: (i - 1) * this.delayBetweenShips + 1000, // Apply delay
                      duration: 8000,
                      ease: 'Sine.easeInOut',
                      repeat: -1,
                      yoyo: true,
                      rotateToPath: true,
                      rotationOffset: -90
                  });
    }
}

    update() {

      
        let my = this.my;
        this.ScoreText.setText('Score: ' + this.player_score);

        if(my.sprite.enemies.length === 0){
            if(this.created_wave === false){
                this.CreateNewWave();
                this.SecondWave();
            }
            else{
                console.log("Game finished!");
                this.scene.start('endgameclass');
            }

        }
    
        my.sprite.playersprite.visible = true;
        const cooldownDuration = 250;
        const enemy_bullet_cooldown = 300;
    
        if ((this.time.now - this.last_bullet) > enemy_bullet_cooldown && my.sprite.enemies.length > 0) {
            let randomIndex = Phaser.Math.RND.between(0, my.sprite.enemies.length - 1);
            let randomEnemy = my.sprite.enemies[randomIndex];
            let enemyBullet = this.add.sprite(randomEnemy.x, randomEnemy.y + 40, "spaceship");
            enemyBullet.setFrame("laserRed01.png");
            this.my.sprite.enemy_bullets.push(enemyBullet);
            this.last_bullet = this.time.now;
        }
    
        this.my.sprite.enemy_bullets = this.my.sprite.enemy_bullets.filter(enemy_bullet => {
            enemy_bullet.y += 20;
            return enemy_bullet.y < 1000;
        });
    
        for (let enemy_bullet of my.sprite.enemy_bullets) {
            if (this.collides(enemy_bullet, my.sprite.playersprite)) {
                my.audio.CRASH.play();
                let explosion = this.add.sprite(my.sprite.playersprite.x, my.sprite.playersprite.y, "explosion").setScale(0.25).play("explosion");
                if(this.deaths == 2){
                    my.audio.GAME_OVER.play();
                    console.log("player is dead");
                    this.game_over = true;
                  //  this.scene.create('endgame');
                   // this.scene.start('endgame');
                   this.scene.start('endgameclass');
                    break;
                }
                else{
                this.UpdateLives();
                console.log(this.deaths);
                }
                my.sprite.playersprite.visible = false;
                enemy_bullet.x = -100;
                this.visible_cooldown = 0;
            }
        }
    
        if (this.aKey.isDown && my.sprite.playersprite.x > (my.sprite.playersprite.displayWidth / 2)) {
            my.sprite.playersprite.x -= 20;
        }
        if (this.dKey.isDown && my.sprite.playersprite.x < (this.game.config.width - (my.sprite.playersprite.displayWidth / 2))) {
            my.sprite.playersprite.x += 20;
        }
        if ((this.time.now - this.lastime) > cooldownDuration) {
            if (this.spacebar.isDown) {
                if (my.sprite.bullet.length < this.maxBullets) {
                    let newBullet = this.add.sprite(my.sprite.playersprite.x, my.sprite.playersprite.y - 40, "spaceship");
                    newBullet.setFrame("laserGreen09.png");
                    my.sprite.bullet.push(newBullet);
                    my.audio.PEW.play();
                }
                this.lastime = this.time.now;
            }
        }
    
        for (let bullet of my.sprite.bullet) {
            bullet.y -= 20;
            for (let enemy of my.sprite.enemies) {
                if (enemy.visible && this.collides(enemy, bullet)) {
                    this.player_score += 100;
                    my.audio.CRASH.play();
                    let explosion = this.add.sprite(enemy.x, enemy.y, "explosion").setScale(0.25).play("explosion");
                    bullet.y = -100;
                    enemy.visible = false;
                    break; 
                }
            }
        }
    
        // Remove destroyed enemies from the array
        my.sprite.enemies = my.sprite.enemies.filter(enemy => enemy.visible);

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight / 2));
    }

    
        
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth / 2 + b.displayWidth / 2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight / 2 + b.displayHeight / 2)) return false;
        return true;
    }

    resetGame() {
        let my = this.my;

        // Reset all necessary variables and game states
        my.sprite.bullet = [];
        my.sprite.enemies = [];
        my.sprite.enemy_bullets = [];
        this.maxEnemies = 8;
        this.maxBullets = 10;
        this.delayBetweenShips = 500;
        this.red_turn = true;
        this.green_turn = false;
        this.created_wave = false;
        this.deaths = 0;
        this.game_over = false;
    }
}

