var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup,obstacleGroup;
var gameOver,restart;
var cloudImage,obstacle1,obstacle2,obstacle3,obstacle4,obsatcle5,obstacle6;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,130);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background(180);
  
 textSize(20);
 text("Score: " + score,20,20);
  if(gamestate === PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("space")&&trex.y>160){
    trex.velocityY = -12;
  }
   trex.velocityY = trex.velocityY + 0.8;
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnCloud();
  spawnObstacle();
  trex.collide(invisibleGround);
  if(obstacleGroup.isTouching(trex)){
     gamestate = END;
     score = 0;
   }
  }
   else if(gamestate === END){
    gameOver.visible = true;
    restart.visible = true;
     
    ground.velocityX = 0;
    trex.velocityY = 0;
     
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
     
    trex.addAnimation("collided",trex_collided);
     
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
     
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
}

function spawnCloud(){
  if(frameCount%60 === 0){
    var cloud = createSprite(600,150,50,20);
    cloud.velocityX = -2;
    cloud.addImage(cloudImage);
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
    cloud.y = Math.round(random(120,140));
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}

function spawnObstacle(){
  if(frameCount%90 === 0){
    var obstacle = createSprite(600,170,20,30);
    obstacle.velocityX = -2;
    var rand = Math.round(random(1,6));
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);
    switch(rand){
      case 1 : obstacle.addImage(obstacle1);
               break;
      case 2 : obstacle.addImage(obstacle2);
               break;
      case 3 : obstacle.addImage(obstacle3);
               break;
      case 4 : obstacle.addImage(obstacle4);
               break;
      case 5 : obstacle.addImage(obstacle5);
               break;
      case 6 : obstacle.addImage(obstacle6);
      default : break;      
    }
   }
 }

function reset(){
  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  ground.velocityX = -2;
}