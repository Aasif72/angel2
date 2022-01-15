var sky, skyImg;
var angelWingImg, angelWing, angelWingGroup;
var angel, angelImg;
var spear, spearImg;
var score;
var wingScore;
var gameState = "play"

function preload(){
  skyImg = loadImage("sky.jpeg");
  angelWingImg = loadImage("angelwing.png");
  angelImg = loadImage("angel.png");
  spearImg=loadImage("spear.png");
}

function setup() {
  createCanvas(600, 600);
  sky = createSprite(300,300);
  sky.addImage("sky",skyImg);
  sky.velocityY = 1;

  angel=createSprite(200,200,50,50);
  angel.addImage("angel", angelImg);
  angel.scale=0.2;

  score=0;
  wingScore=0;
  
  angelWingGroup=new Group();
  spearGroup=new Group();
}

function draw() {
  background(200);

  if(gameState==="play"){
    if(sky.y > 400)
      sky.y = 300
    }

    if(keyDown("left_arrow")){
      angel.x=angel.x-3;
    }

    if(keyDown("right_arrow")){
      angel.x=angel.x+3;
    }

    if(keyDown("space")){
      angel.velocityY=-7;
    }
    
    spawnAngelWings();
    spawnSpear();
    addingScore();
    
    angel.velocityY=angel.velocityY+0.8;

    drawSprites();
  
  
    if(gameState==="end"){
      background("black");

      textSize(50);
      stroke("red");
      fill("red");
      text("Game Over",200,200);

      angel.velocityY=0;
      angelWing.velocityY=0;
      spear.velocityY=0;

      winScore=0;
      score =0;
      
    }

    if(spearGroup.isTouching(angel)){
      gameState="end";
    }

    textSize(15);
    stroke("blue");
    fill("blue");
    score = score + Math.round(getFrameRate()/60);
    text("Score: "+ score, 500,50);
    text("Wings: "+ wingScore, 500,30);

}

function spawnAngelWings(){
  if(frameCount%240===0){
    angelWing=createSprite(Math.round(random(50,550)),-50);
    angelWing.addImage(angelWingImg);
    angelWing.velocityY=1;
    angelWing.lifetime=800;
    angelWingGroup.add(angelWing);
    angelWing.scale=0.1;

    angel.depth=angelWing.depth;
    angel.depth+=2;
  }
}

function spawnSpear(){
  if(frameCount%144===0){
    spear=createSprite(Math.round(random(50,450)),610);
    spear.addImage(spearImg);
    spear.velocityY=-1;
    spear.lifetime=900;
    spearGroup.add(spear);
    spear.scale=0.1;
  }
}

function addingScore(){
  if(angelWingGroup.isTouching(angel)){
    angelWing.x=1500;
    wingScore=wingScore+1;
    
  }
}
