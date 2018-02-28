var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cols = 5;
var rows = 9;
var redius = 8;
var offset = 20;
var colon = [
  [0],[0],[0],[1],[0],[1],[0],[0],[0]
];
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
  ctx.clearRect(0,0,canvas.width,canvas.height);
  var now_time = new Date();
  var hour = now_time.getHours();
  drowNumber(hour,20,20);
  var minutes = now_time.getMinutes();
  drowNumber(minutes,280,20);
  var seconds = now_time.getSeconds();
  drowNumber(seconds,540,20);
  drowColon();
}
function drowNumber(number,start_x,start_y) {
  let first_number = Math.floor(number/10);
  drawImg(matrix[first_number],start_x,start_y,rows,cols);
  let second_number = number%10;
  drawImg(matrix[second_number],start_x+(redius+1)*2*cols+offset,start_y,rows,cols);
}
function drowColon() {
  drawImg(colon,240,20,rows,cols);
  drawImg(colon,500,20,rows,cols);
}
setInterval(drawClock,50);
