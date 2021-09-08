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
 eat.looping=false;



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
  bunny=createSprite(250,650);
 
  bunny.scale=0.2;
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
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
  image(food,fruit.position.x,fruit.position.y,60,60);
  Engine.update(engine);
  drawSprites();
 
   
}
function drop(){
  rope.break();
  fruit_con.deattach();
  fruit_con=null;
 // bunny.changeAnimation('eating')
}




