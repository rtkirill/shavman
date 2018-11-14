"use strict";

function main() {
    //Get canvas
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    //Load sounds
    var bgSound = new Audio();
    var dreamSound = new Audio();
    var enemySound = new Audio();

    bgSound.src = 'assets/sounds/bgSound.mp3';
    dreamSound.src = 'assets/sounds/forDream.mp3';
    enemySound.src = 'assets/sounds/forEnemy.mp3';

    //Load images
    var bgImg = new Image();
    var heroImg = new Image();
    var enemyImg = new Image();
    var dreamImg = new Image();
    var successImg = new Image();
    var failImg = new Image();

    bgImg.src = 'assets/img/BgImg.jpg';
    heroImg.src = 'assets/img/HeroImg.png';
    enemyImg.src = 'assets/img/enemyImg.png';
    dreamImg.src = 'assets/img/dreamImg.png';
    successImg.src = 'assets/img/SuccessImg.png';
    failImg.src = 'assets/img/FailImg.png';

    //Elements initial position
    var hero = {
        x: 50,
        y: cvs.height - 230
    };
    var goal = [];
    goal[0] = {
        x: 100,
        y: 0
    };

    //Kind of items
    var items = ["dream", "enemy"];
    var randItem = "dream";

    //Initial parameters
    var speed = 4;
    var score = 0;

    //Moving hero
    document.onkeydown = function(e) {
        if(e.code == "ArrowLeft" && hero.x >= 20)
            hero.x -= 30;
        if(e.code == "ArrowRight" && hero.x <= 320)
            hero.x += 30;
    };

    //Draw items
    function draw() {

        //Restore
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        //Background sound
        bgSound.play();

        //Draw start elements
        ctx.globalAlpha = 1.0;
        ctx.drawImage(bgImg,0,0);
        ctx.drawImage(heroImg,hero.x,hero.y);

        //Draw moving items
        for(var i=0; i<goal.length; i++) {
            if(hero.x <= goal[i].x+dreamImg.width
                && hero.x+heroImg.width >= goal[i].x
                && hero.y <= goal[i].y
                && goal[i].y < 500) {

                //Show hero emotion
                if(randItem == "dream") {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(successImg,hero.x,hero.y);
                } else {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(failImg, hero.x, hero.y);

                    //Lose
                    score = 0;
                    enemySound.play();
                }

                //Calculate score and increment speed every 5 score
                if(goal[i].y>=hero.y && goal[i].y<hero.y+speed) {
                    score++;
                    dreamSound.play();
                    if (score > 0 && score % 5 == 0 && speed<8) {
                        speed++;
                    }
                }

                //Hide item if hero got it
                ctx.globalAlpha = 0.0;
            }

            //Show random next item
            randItem=="dream" ?
                ctx.drawImage(dreamImg,goal[i].x,goal[i].y) : ctx.drawImage(enemyImg,goal[i].x,goal[i].y);

            //Change level by speed up
            goal[i].y += speed;

            //Choose next item random position
            if(goal[i].y>=cvs.height && goal[i].y<cvs.height+speed) {
                goal.push({
                    x: Math.floor(Math.random() * (cvs.width-70)),
                    y: 0
                });

            //Choose random next item
                randItem = items[Math.floor(Math.random() * items.length)];
            }

            //Show score
            ctx.fillStyle = "#fff";
            ctx.font = "24px Verdana";
            ctx.globalAlpha = 1.0;
            ctx.fillText("SCORE: " + score, cvs.width - 150, cvs.height - 20);

        }
        //Repeat all always, every *** seconds...
        requestAnimationFrame(draw);
    }

    //exclude error of call draw-function before img loaded
    failImg.onload = draw;
}

//Start after loading of DOM
document.addEventListener("DOMContentLoaded", main);
