"use strict";

function main() {
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


    var hero = {
        x: 50,
        y: cvs.height - 230
    };
    var goal = [];
    goal[0] = {
        x: 100,
        y: 0
    };
    var items = ["dream", "enemy"];
    var randItem = "dream"
    var speed = 4;
    var score = 0;

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

        // bgSound.play();

        //Hero
        ctx.globalAlpha = 1.0;
        ctx.drawImage(bgImg,0,0);
        ctx.drawImage(heroImg,hero.x,hero.y);

        for(var i=0; i<goal.length; i++) {
            if(hero.x <= goal[i].x+dreamImg.width
                && hero.x+heroImg.width >= goal[i].x
                && hero.y <= goal[i].y
                && goal[i].y < 500) {

                if(randItem == "dream") {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(successImg,hero.x,hero.y);
                } else {
                    ctx.globalAlpha = 1.0;
                    ctx.drawImage(failImg, hero.x, hero.y);
                    // enemySound.play();
                    score = 0;
                    location.reload();
                }

                if(goal[i].y>=hero.y && goal[i].y<hero.y+speed) {
                    score++;
                    // dreamSound.play();
                    if (score > 0 && score % 5 == 0 && speed<8) {
                        speed++;
                    }
                }

                ctx.globalAlpha = 0.0;
            }
            randItem=="dream" ?
                ctx.drawImage(dreamImg,goal[i].x,goal[i].y) : ctx.drawImage(enemyImg,goal[i].x,goal[i].y);


            goal[i].y += speed;

            if(goal[i].y>=cvs.height && goal[i].y<cvs.height+speed) {
                goal.push({
                    x: Math.floor(Math.random() * (cvs.width-70)),
                    y: 0
                });

                randItem = items[Math.floor(Math.random() * items.length)];
            }



            ctx.fillStyle = "#fff";
            ctx.font = "24px Verdana";
            ctx.globalAlpha = 1.0;
            ctx.fillText("SCORE: " + score, cvs.width - 150, cvs.height - 20);

        }

        requestAnimationFrame(draw);
    }

    failImg.onload = draw;
}

document.addEventListener("DOMContentLoaded", main);
