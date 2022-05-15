import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

function BreakOut(){
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const router = useRouter()
  //const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"))

  //let canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  let canvasRef:any;
  if (typeof document !== "undefined") {
    canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"))!
  }
  const draw = () => {  

    const canvas = canvasRef.current
    const ctx = canvasRef.current.getContext('2d')!

    // ctx.fillStyle = "green";
    // ctx.beginPath();
    // ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke();

    // var canvas = document.getElementById("myCanvas");
    // var ctx = canvas.getContext("2d");

    var x = canvas.width/2;
    var y = canvas.height-30;

    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth) / 2;    

    // 
    var dx = 2;
    var dy = -2;

    var ballRadius = 10;
    
    //
    var rightPressed = false;
    var leftPressed = false;

    //
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;

    //
    var bricks:any = [];

    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    
    //
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e:any) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e:any) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                    }
                }
            }
        }
    }

    function draw(progress:any) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        collisionDetection();

        if(x + dx > canvas.width || x + dx < ballRadius) {
            dx = -dx;
        }

        if(y + dy < ballRadius) {
            dy = -dy;
        } else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                //alert("GAME OVER");
                router.reload();
                // document.location.reload();
                // clearInterval(interval);
            }
        }

        if(rightPressed) {
            paddleX += progress * 250;

            console.log("Progress ", (progress * 250))

            if (paddleX + paddleWidth > canvas.width){
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if(leftPressed) {
            paddleX -= progress * 250;

            console.log("Progress ", (progress * 250))
            if (paddleX < 0){
                paddleX = 0;
            }
        }

        x += dx;
        y += dy;
    }


    //var interval = setInterval(draw, 100);

    window.requestAnimationFrame(gameLoop);

    var lastRender = 0;

    function gameLoop(timeStamp:any) {
        var elapsedTime = (timeStamp - lastRender) 

        // changing milliseconds to seconds
        var progress = (timeStamp - lastRender) * (1 / 1000)
        progress = Math.min(progress, 0.1);
        draw(progress);
        window.requestAnimationFrame(gameLoop);
        lastRender = timeStamp
    }
  }

  useEffect(()=>{
    
    draw();

  },[])

  return (  
    <div>
      <canvas ref={canvasRef} width={450} height={400} />
    </div>
  );
}

export default BreakOut