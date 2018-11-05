"use strict";

function main() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    //Load images
    var bgImg = new Image();
    var heroImg = new Image();
    var enemyImg = new Image();
    var goalImg = new Image();
    var successImg = new Image();
    var failImg = new Image();

    bgImg.src = 'assets/img/BgImg.jpg';
    heroImg.src = 'assets/img/HeroImg.png';
    enemyImg.src = 'assets/img/enemyImg.png';
    goalImg.src = 'assets/img/goalImg.png';
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
    var enemy = [];
    enemy[0] = {
        x: cvs.width - 100,
        y: 0
    };
    var items = ["goal", "enemy"];
    var itemImg;

    document.onkeydown = function(e) {
        if(e.code == "ArrowLeft" && hero.x >= 20)
            hero.x -= 30;
        if(e.code == "ArrowRight" && hero.x <= 320)
            hero.x += 30;
    };

    //Draw items
    function draw() {
       /* var randItem = items[Math.floor(Math.random() * items.length)];
        console.log(randItem);*/

        //Restore
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        //Hero
        ctx.drawImage(bgImg,0,0);
        ctx.drawImage(heroImg,hero.x,hero.y);

        for(var i=0; i<goal.length; i++) {
            ctx.drawImage(goalImg,goal[i].x,goal[i].y);
            goal[i].y += 4;

            // console.log(goal[i].y);

            if(goal[i].y == 260) {
                goal.push({
                    x: Math.floor(Math.random() * (cvs.width-70)),
                    y: 0
                });
            }

            if(hero.x <= goal[i].x && hero.x+heroImg.width >= goal[i].x+goalImg.width
                && hero.y <= goal[i].y && goal[i].y < 500) {
                ctx.drawImage(successImg,hero.x,hero.y);
            }

        }



        /*if(hero.x >= goal.x && hero.x <= goal.x+goal.width
            && hero.x+hero.width <= goal.x && hero.x+hero.width >= goal.x) {
            ctx.drawImage(successImg,hero.x,hero.y);
        }*/


        /*ctx.drawImage(goalImg,goalPosX,goalPosY);
        ctx.drawImage(enemyImg,enemyPosX,enemyPosY);*/

        requestAnimationFrame(draw);
    }

    failImg.onload = draw;
}

document.addEventListener("DOMContentLoaded", main);
