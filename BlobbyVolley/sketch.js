
/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var world;
var engine;

var balls = [];
var players = [];
var boundariesOther = [];
var boundariesLeft = [];
var boundariesRight = [];
var cWidth, cHeight;

var ballCount = 0;
var ballWidth = 50;

var leftHit, rightHit;
var leftScore, rightScore;


let img_ball;

function preload() {
    img_ball = loadImage('images/ball.png');
}

function setup() {
    
    leftScore = 0;
    rightScore = 0;
    leftHit = false;
    rightHit = false;
    cWidth = windowWidth-10;
    cHeight = windowHeight-10;

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    for(var i=0;i<ballCount;i++){
        var x = floor(random(0,1000));
        var y = floor(random(0,1000));
        balls.push(new Ball(x,y,ballWidth));
    }

    //Adding boundaries
    var bWidth = 20;
    boundariesOther.push(new Boundary(0,cHeight/2,bWidth,cHeight, color('gray'))); //Left
    boundariesOther.push(new Boundary(cWidth,cHeight/2,bWidth,cHeight, color('gray'))); //Right
    boundariesOther.push(new Boundary(cWidth/2,cHeight*(3/5),bWidth,bWidth, color('blue'))); //Nett topp

    boundariesLeft.push(new Boundary(cWidth/4,cHeight-bWidth/2,cWidth/2,bWidth, color('red'))); //Ground left
    boundariesLeft.push(new Boundary(cWidth/2-bWidth/4,cHeight*(8/10),bWidth/2,cHeight/3, color('red'))); //Nett middle left
    
    boundariesRight.push(new Boundary(cWidth*(3/4),cHeight-bWidth/2,cWidth/2,bWidth, color('green'))); //Ground Right
    boundariesLeft.push(new Boundary(cWidth/2+bWidth/4,cHeight*(8/10),bWidth/2,cHeight/3, color('green'))); //Nett middle left

    //Creating canvas
    fill(255);
    createCanvas(cWidth,cHeight);
}

function mousePressed(){
    balls.push(new Ball(mouseX,mouseY,ballWidth));
}

function draw() {
    background(100);
    boundariesOther.forEach(function(bOther){
        bOther.show();
    })

    boundariesLeft.forEach(function(bLeft){
        bLeft.show();
    })

    boundariesRight.forEach(function(bRight){
        bRight.show();
    })
    
    balls.forEach(function(ball){
        ball.show(); 
    })

    //updateScore();

    textSize(30);
    text(leftScore,30,40);
    text(rightScore,cWidth-60,40);

}

function updateScore() {
    balls.forEach(function(ball){
        boundariesRight.forEach(function(bR){
            if(ball.hitBoundary(bR)){
                leftScore++;
                bR.hit = true;
            }
        });
        boundariesLeft.forEach(function(bL){
            if(ball.hitBoundary(bL)){
                rightScore++;
                bL.hit = true;
            }
        });
    });
}

