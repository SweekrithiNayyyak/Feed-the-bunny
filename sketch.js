const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var rope;
let engine;
let world;
var ground;
var fruit;
var fruit_con;
var bgImg, food, rabbitImg;
var bunny;
var button;

var blink,eat,sad;
function preload(){
  bgImg=loadImage("background.png");
  food=loadImage("melon.png");
  rabbitImg=loadImage("Rabbit-01.png");

  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
 eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
 sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png");

 blink.playing=true;
 eat.playing=true;
 sad.playing=true;
 eat.looping=false;
 sad.looping=false;



}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  ground=new Ground(200,690,600,20)
  rope=new Rope(6,{x:245,y:30})

  fruit=Bodies.circle(200,200,10)
  World.add(world,fruit);
  Matter.Composite.add( rope.body,fruit);
  blink.frameDelay=20;
  eat.frameDealy=20;
  sad.frameDelay=20;
  bunny=createSprite(50,650);
 
  bunny.scale=0.2;
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  fruit_con=new Link(rope,fruit);
  button=createImg('cut_button.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop)
 
}

function draw() 
{ imageMode(CENTER);
  background(51);
  image(bgImg,displayWidth/2,displayHeight/2,displayWidth,displayHeight);

  ground.show();
  rope.show();
  if(fruit!==null){
    image(food,fruit.position.x,fruit.position.y,60,60);
  }
if(collide(fruit,bunny)==true){
  bunny.changeAnimation('eating')
}
if(collide(fruit,ground.body)==true){
  bunny.changeAnimation('crying')
}
  Engine.update(engine);
  drawSprites();
 
   
}
function drop(){
  rope.break();
  fruit_con.deattach();
  fruit_con=null;
 // bunny.changeAnimation('eating')
}

function collide(body,sprite){
  if(body!==null){
    var d=dist(body.position.x,body.position.y,sprite.x,sprite.y);
    if(d<80){
      World.remove(world,fruit);
      fruit=null;
      return true;
    }
    else{
      return false;
    }
  }
}
//function to detected coliision between two bodies
/*function bCollide(body1,body2){
  if(body1!==null && body2!==null){
    var d=dist(body1.position.x,body1.position.y,body2.position.x,body2.position.y);
    if(d<80){
      World.remove(world,fruit);
      fruit=null;
      return true;
    }
    else{
      return false;
    }
  }
}*/




