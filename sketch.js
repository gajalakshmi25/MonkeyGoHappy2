var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage1, obstacleImage2, obstacleImage3;
var foodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage1 = loadImage("obstacle.png");
  obstacleImage2 = loadImage("BombMonkey.jpg");
  obstacleImage3 = loadImage("PoisonMonkey.png");
  
}



function setup() {
  createCanvas(500, 500);

  ground = createSprite(250, 490, 500, 10);
  ground.velocityX = -4;

  var ground2 = createSprite(250, 490, 500, 10);

  monkey = createSprite(100, 428, 30, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white");

  if (ground.x < 0) {
    ground.x = 250;
  }

  if (keyDown("space") && monkey.y >= 420) {
    monkey.velocityY = -22;
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  drawSprites();

  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(World.seconds);
  text("Survival Time : "+ survivalTime, 170, 50);
  
}

function spawnBanana() {
  
  if (frameCount % 160 === 0) {

    var rand = Math.round(random(1,5));
    
    banana = createSprite(500, 60 + (rand * 20), 20, 20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 140;
    
    foodGroup.add(banana);

  }
}

function spawnObstacles() {
  
  if(frameCount % 270 === 0) {
    
    obstacle = createSprite(500,450,20,20);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    
    var rand = Math.round(random(1,3));
    switch (rand) {
      case 1: obstacle.addImage(obstacleImage1);
        break;
      case 2: obstacle.addImage(obstacleImage2);
        break;
      case 3: obstacle.addImage(obstacleImage3);
              obstacle.scale = 0.05;
              obstacle.y -= 20;
        break;
    }   
    
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
    
  }
  
}