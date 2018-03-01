var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cols = 5;
var rows = 9;
var redius = 8;
var offset = 20;
var balls = [];
var old_time = null;
var now_time = null;
var hour_x = 20;
var minutes_x = 280;
var seconds_x = 540;
var position_y = 20;
var colon_x1 = 240;
var colon_x2 = 500;
var colon = [[0],[0],[0],[1],[0],[1],[0],[0],[0]];
var timer = 0;
var color_chose = [
  'rgba(195,106,185,1)',
  'rgba(152,195,121,1)',
  'rgba(254,205,82,1)',
  'rgba(50,227,255,1)',
  'rgba(184,254,241,1)',
  'rgba(253,105,137,1)',
  'rgba(254,86,84,1)',
  'rgba(161,247,55,1)',
  'rgba(187,200,195,1)',
  "rgba(255,165,0,1)"
]
function drawImg(img_matrix,start_x,start_y,row_num,cols_num) {
  for (var i = 0; i < row_num; i++) {
    for (var j = 0; j < cols_num; j++) {
      if(img_matrix[i][j]){
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,165,255,1)";
        ctx.arc((redius+1)*2*j+redius+1+start_x,(redius+1)*2*i+redius+1+start_y,redius,0,Math.PI*2,true);
        ctx.fill();
      }
    }
  }
}
function drawClock() {
  var hour = now_time.getHours();
  drowNumber(hour,hour_x,position_y);
  var minutes = now_time.getMinutes();
  drowNumber(minutes,minutes_x,position_y);
  var seconds = now_time.getSeconds();
  drowNumber(seconds,seconds_x,position_y);
  drowColon();
}
function drowNumber(number,start_x,start_y) {
  let first_number = Math.floor(number/10);
  drawImg(matrix[first_number],start_x,start_y,rows,cols);
  let second_number = number%10;
  drawImg(matrix[second_number],start_x+(redius+1)*2*cols+offset,start_y,rows,cols);
}
function drowColon() {
  drawImg(colon,colon_x1,position_y,rows,cols);
  drawImg(colon,colon_x2,position_y,rows,cols);
}
function start() {
  old_time = now_time = new Date();
  var timer = setInterval(function(){
    render();
    update();
  },50);
}
function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  now_time = new Date();
  drawClock();
  for (var i = 0; i < balls.length; i++) {
    drawColorBall(balls[i]);
  }
  if ( now_time.getSeconds() !== old_time.getSeconds() ) {
    fillBallArray();
    old_time = now_time;
  }
}
function update() {
  for (var i = balls.length - 1; i >= 0; i--) {
    updateBalls(balls[i],i);
  }
}
function fillBallArray() {
  let old_hour = old_time.getHours();
  let fo_hour = Math.floor(old_hour/10);
  let so_hour = old_hour%10;
  let old_minutes = old_time.getMinutes();
  let fo_minutes = Math.floor(old_minutes/10);
  let so_minutes = old_minutes%10;
  let old_seconds = old_time.getSeconds();
  let fo_seconds = Math.floor(old_seconds/10);
  let so_seconds = old_seconds%10;
  createBall(matrix[fo_hour],hour_x,position_y,rows,cols);
  createBall(matrix[so_hour],hour_x+(redius+1)*2*cols+offset,position_y,rows,cols);
  createBall(matrix[fo_minutes],minutes_x,position_y,rows,cols);
  createBall(matrix[so_minutes],minutes_x+(redius+1)*2*cols+offset,position_y,rows,cols);
  createBall(matrix[fo_seconds],seconds_x,position_y,rows,cols);
  createBall(matrix[so_seconds],seconds_x+(redius+1)*2*cols+offset,position_y,rows,cols);
  createBall(colon,colon_x1,position_y,rows,cols);
  createBall(colon,colon_x2,position_y,rows,cols);
}
function createBall(img_matrix,start_x,start_y,row_num,cols_num) {
  for (var i = 0; i < row_num; i++) {
    for (var j = 0; j < cols_num; j++) {
      if(img_matrix[i][j]){
        var ball = {
          x:(redius+1)*2*j+redius+1+start_x,
          y:(redius+1)*2*i+redius+1+start_y,
          r:redius,
          vx:Math.round((Math.random() - 0.5)*3),
          vy:1,
          g:4,
          times:0,
          color:color_chose[Math.floor(Math.random()*color_chose.length)],
          k:0.6,
          vr:0.97
        }
        ball.oy = ball.y;
        balls.push(ball);
      }
    }
  }
}
function drawColorBall(ball){
  ctx.beginPath();
  ctx.fillStyle = ball.color;
  ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2,true);
  ctx.fill();
}
function updateBalls(ball,i) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy += ball.g;
  ball.r *= ball.vr;
  if ( (ball.y-ball.oy>=100 && ball.times===0) || ball.y >= canvas.height) {
    ball.vy = -(ball.vy*ball.k);
    ball.times = 1;
  }
  if( ball.r < 0.5 ){
    balls.splice(i,1);
  }
}
start();
