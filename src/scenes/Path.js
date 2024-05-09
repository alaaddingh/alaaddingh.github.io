class Path extends Phaser.Scene {
    // Class variable definitions -- these are all "undefined" to start
    graphics;
    curve;
    path;

    constructor() {
        super("pathMaker");
    }

    preload() {
        this.load.setPath("./assets/");
        
        this.load.atlasXML("spaceship", "kenney_space-shooter-redux/Spritesheet/sheet.png", "kenney_space-shooter-redux/Spritesheet/sheet.xml");                        // Set load path
        this.load.image("x-mark", "numeralX.png");             // x marks the spot
        this.load.image("enemyShip", "enemyGreen1.png");       // spaceship that runs along the path
    }

    create() {
        // Create a curve, for use with the path
        // Initial set of points are only used to ensure there is something on screen to begin with.
        // No need to save these values.
        this.points = [
            20, 20,
            80, 400,
            300, 750
        ];
        this.curve = new Phaser.Curves.Spline(this.points);

        // Initialize Phaser graphics, used to draw lines
        this.graphics = this.add.graphics();

        // Define key bindings
        this.ESCKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Draw initial graphics
        this.xImages = [];
        this.drawPoints();
        this.drawLine();
        this.runMode = false;

        // Create mouse event handler
        // We create this in create() since we only want one active in this scene
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            this.addPoint({ x: pointer.x, y: pointer.y });
            this.drawLine();

            my.sprite.red1_enemy = this.add.sprite(500, 250, "spaceship");
            my.sprite.red1_enemy.setFrame("enemyRed2.png");
           /*
            my.sprite.red2_enemy = this.add.sprite(625, 375, "spaceship");
            my.sprite.red2_enemy.setFrame("enemyRed2.png");
           
    
            my.sprite.red3_enemy = this.add.sprite(375, 375, "spaceship");
            my.sprite.red3_enemy.setFrame("enemyRed2.png");
           
            
            my.sprite.red4_enemy = this.add.sprite(500, 375, "spaceship");
            my.sprite.red4_enemy.setFrame("enemyRed2.png");
         
    
            my.sprite.green1_enemy = this.add.sprite(250, 250, "spaceship");
            my.sprite.green1_enemy.setFrame("enemyGreen2.png");
          
    
            my.sprite.green2_enemy = this.add.sprite(375, 250, "spaceship");
            my.sprite.green2_enemy.setFrame("enemyGreen2.png");
      
    
            my.sprite.green3_enemy = this.add.sprite(250, 375, "spaceship");
            my.sprite.green3_enemy.setFrame("enemyGreen2.png");

    
            my.sprite.green4_enemy = this.add.sprite(125, 250, "spaceship");
            my.sprite.green4_enemy.setFrame("enemyGreen2.png");
          
            my.sprite.black1_enemy = this.add.sprite(750, 250, "spaceship");
            my.sprite.black1_enemy.setFrame("enemyBlack3.png");
           
            my.sprite.black2_enemy = this.add.sprite(625, 250, "spaceship");
            my.sprite.black2_enemy.setFrame("enemyBlack3.png");
          
    
            my.sprite.black3_enemy = this.add.sprite(750, 375, "spaceship");
            my.sprite.black3_enemy.setFrame("enemyBlack3.png");
            my.sprite.enemies[10] = my.sprite.black3_enemy;
    
            my.sprite.black4_enemy = this.add.sprite(875, 250, "spaceship");
            my.sprite.black4_enemy.setFrame("enemyBlack3.png");
            my.sprite.enemies[11] = my.sprite.black4_enemy; */
        });

        // TODO:
        //  - set the run mode flag to false (after implenting run mode)

        // Create enemyShip as a follower type of sprite
        // Call startFollow() on enemyShip to have it follow the curve
        my.sprite.enemyShip = this.add.follower(this.curve, 10, 10, "enemyShip");
        my.sprite.enemyShip.visible = false;

        document.getElementById('description').innerHTML = '<h2>Path.js</h2><br>ESC: Clear points <br>O - output points <br>R - run mode';
    }

    // Draws an x mark at every point along the spline.
    drawPoints() {
        for (let point of this.curve.points) {
            this.xImages.push(this.add.image(point.x, point.y, "x-mark"));
        }
    }

    // Clear points
    // Removes all of the points, and then clears the line and x-marks
    clearPoints() {
        this.curve.points = [];
        this.graphics.clear();
        for (let img of this.xImages) {
            img.destroy();
        }
    }

    // Add a point to the spline
    addPoint(point) {
        this.curve.addPoint(point);
        this.xImages.push(this.add.image(point.x, point.y, "x-mark"));
      //  console.log("ximage:" + this.Ximages);
    }

    // Draws the spline
    drawLine() {
        this.graphics.clear();                      // Clear the existing line
        this.graphics.lineStyle(2, 0xffffff, 1);    // A white line
        this.curve.draw(this.graphics, 32);         // Draw the spline
    }

    stopFollow(){
        my.sprite.enemyShip.visible = false;
    }

    
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.ESCKey)) {
            console.log("Clear path");
            if(this.runMode != true){
                this.clearPoints();
            }
            // TODO: 

            
            // * Add code to check if run mode is active
            //   If run mode is active, then don't call clearPoints()
            //   (i.e., can only clear points when not in run mode)


        }



        if (Phaser.Input.Keyboard.JustDown(this.oKey)) {
            console.log(this.curve.points[1]);
            console.log("Output the points");
            for (let point of this.curve.points){
                
               console.log("x: " +  point.x + " y: " + point.y);
            }
        }

            
            // TODO:
            // * Print out the points comprising the line
            //   use a "for ... of" loop to iterate through the
            //   elements of this.curve.points 
            //
            // Format them in the form of an array, so you can copy/paste into
            // your gallery shooter game:
            // [
            //  point0.x, point0.y,
            //  point1.x, point1.y
            // ]
        

        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            console.log("Run mode");

            if(this.runMode == true){
              //  stopFollow
            }
            else{
                this.runMode = true;
                
                my.sprite.enemyShip = this.add.follower(this.curve, this.curve.points[0].x, this.curve.points[0].y, "enemyShip");
                my.sprite.enemyShip.visible = true;
                my.sprite.enemyShip.startFollow({from: 0,
                    to: 1,
                    delay: 0,
                    duration: 2000,
                    ease: 'Sine.easeInOut',
                    repeat: 0,
                    yoyo: false,
                    rotateToPath: true,
                    rotationOffset: -90}); 
            }

        }
    }
}