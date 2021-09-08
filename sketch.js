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
function preload(){
  bgImg=loadImage("background.png");
  food=loadImage("melon.png");
  rabbitImg=loadImage("Rabbit-01.png");

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
  
  bunny=createSprite(250,650);
  bunny.addImage(rabbitImg)
  bunny.scale=0.2;

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
}




