//declaring objects and score
var back, backImage;
var player, playerImage;
var zombie, zombieImage, zombiesGroup;
var button, buttonImage;
var gameOver, gameOverImage;
var restart, restartImage;
var PLAY=2;
var END=0;
var gameState=PLAY;
var score;
var antidote, antidoteImage, antidotesGroup;
var spookySound;

//load IMAGES and ANIMATIONS
function preload(){
backImage=loadImage("creepyBackground.jpg");
playerImage=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
zombieImage=loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png");
buttonImage=loadImage("redButton.png");
gameOverImage=loadImage("GAMEOVER.png");
antidoteImage=loadImage("antidote.png");
restartImage=loadImage("restart.png");
spookySound=loadSound("scaryMusic.mp3");
}

//creating objects and score
function setup() {
createCanvas(550,550);
back=createSprite(200,200);
back.addImage(backImage);
player=createSprite(50,300);
player.addAnimation("running",playerImage);
player.scale=0.3;
button=createSprite(500,50);
button.addImage(buttonImage);
button.scale=0.2;
zombiesGroup=createGroup();
gameOver=createSprite(275,275);
gameOver.addImage(gameOverImage);
gameOver.scale=0.4;
score=0;
antidotesGroup=createGroup();
restart=createSprite(277,370);
restart.addImage(restartImage);
restart.scale=0.1;
}

function draw() {
background(220);
  //setting collider
  player.debug=false;
  player.setCollider("rectangle",0,0,40,player.height)
  //setting gamestate as PLAY
 if (gameState===PLAY){
 //spookySound.play();
 gameOver.visible=false;
 restart.visible=false;
 back.velocityX=-9;
   if (back.x<0){
   back.x=back.width/2;
   }
   if (keyDown("space")){
   zombiesGroup.destroyEach();
   }
   player.y=World.mouseY;
 Zombies();
 Antidotes();
   //Iincreasing score
   if (player.isTouching(antidotesGroup)){
       score=score+1;
       antidotesGroup.destroyEach();
       }
   if (player.isTouching(zombiesGroup)){
     gameState=END;
   }
 }
  //setting gamestate as END
  if (gameState===END){
  gameOver.visible=true;
  restart.visible=true;
  back.velocityX=0;
  player.visible=false;
    //restarting game
    if(mousePressedOver(restart)){
    score=0;
    gameState=PLAY;
    player.visible=true;
    }
  }
drawSprites();
//adding text
fill ("black");
text ("RUN",490,52);
fill ("GREY");
textSize(15);

text ("Press 'SPACE KEY' to kill the Zombies",150,19)

fill("cyan");
text ("SCORE = "+score,20,20);
fill("GREY");
text("SAYAN'S HARD WORLD",10,545)
}

//creating function for ZOMBIES
function Zombies(){
  if (frameCount%100===0){
  zombie=createSprite(350,300);
  zombie.addAnimation("moving",zombieImage);
  zombie.scale=0.5;
  zombie.y=Math.round(random(150,500));
  zombie.velocityX=-15;
  zombie.lifetime=150;
  zombiesGroup.add(zombie);
  }
}

//creating function for ANTIDOTES
function Antidotes(){
 if (frameCount%60===0){
  antidote=createSprite(350,300);
  antidote.addImage(antidoteImage);
  antidote.scale=0.1;
  antidote.velocityX=-12;
  antidote.y=Math.round(random(150,500));
  antidote.lifetime=150;
  antidotesGroup.add(antidote);
 }
}