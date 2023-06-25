var scene, sceneImage, fighterJet, fighterJetImage, missile, missileImage;
var asteroid, asteroids, asteroid1Image, asteroid2Image;

var gameOver, gameOverImage, resetButton, resetImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var missiles = [];

function preload() {
  sceneImage = loadImage("assets/scene.png");
  fighterJetImage = loadImage("assets/fighterJet.png");
  missileImage = loadImage("assets/missile.png");

  asteroid1Image = loadImage("assets/asteroid1.png");
  asteroid2Image = loadImage("assets/asteroid2.png");

  resetImage = loadImage("assets/resetButton.png");
  gameOverImage = loadImage("assets/gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fighterJet = createSprite(width / 2, height / 2 + 350, 50, 50);
  fighterJet.addImage("jet", fighterJetImage);
  fighterJet.scale = 0.55;
  fighterJet.setCollider("circle", 0, 0, 100);

  missile = createSprite(width / 2, height / 2 + 320, 20, 20);
  missile.addImage("missile", missileImage);
  missile.scale = 0.1;
  missile.visible = false;

  gameOver = createSprite(width / 2, height / 2 - 100, 100, 100);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  resetButton = createSprite(width / 2, height / 2, 50, 50);
  resetButton.addImage("reset", resetImage);
  resetButton.scale = 0.3;
  resetButton.visible = false;

  asteroids = new Group();
}

function draw() {
  background(sceneImage);

  if (gameState == PLAY) {
    if (keyIsDown(RIGHT_ARROW) && fighterJet.x < 1697.5) {
      fighterJet.x = fighterJet.x + 15;
    }

    if (keyIsDown(LEFT_ARROW) && fighterJet.x > 190.5) {
      fighterJet.x = fighterJet.x - 15;
    }

    showAsteroids();
    
    if (keyCode === 32) {
      missile.velocityY = -7;
      missile.visible = true;
      missiles.push(missile);

      missile.x = fighterJet.x;
    }

    for (var i = 0; i < missiles.length; i++) {
      if (keyDown("space")) {
        missile = createSprite(width / 2, height / 2 + 320, 20, 20);
        missile.addImage("missile", missileImage);
        missile.scale = 0.1;
        missile.visible = false;
      }
    }

    if(asteroids.isTouching(missile)){
      score = score + 50;
      missile.destroy();
      asteroids.destroyEach();
    }

    if(asteroids.isTouching(fighterJet)){
      gameState = END;
    }

  } else if (gameState == END) {
    asteroids.setVelocityYEach(0);
    missile.velocityY = 0;

    gameOver.visible = true;
    resetButton.visible = true;

    if(mousePressedOver(resetButton)){
      reset();
    }
  }

  textSize(20);
  fill("lime");
  text("Score: " +  score, 50, 100);
  drawSprites();
}

function reset(){
  asteroids.destroyEach();

  gameOver.visible = false;
  resetButton.visible = false;

  gameState = PLAY;
  score = 0;
}

function showAsteroids() {
  if (frameCount % 60 === 0) {
    asteroid = createSprite(random(50, width), height / 2 - 400, 100, 100);
    asteroid.velocityY = 6;

    var rand = Math.round(random(1, 2));

    switch (rand) {
      case 1:
        asteroid.addImage("asteroid1", asteroid1Image);
        asteroid.scale = 0.3;
        break;
      case 2:
        asteroid.addImage("asteroid2", asteroid2Image);
        asteroid.scale = 0.3;
        break;
      default:
        break;
    }
    asteroids.add(asteroid);
  }
}