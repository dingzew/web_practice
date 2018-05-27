var image;

function twoWay() {
  var response = confirm("Press one button");
  var txt;
  if (response) {
    txt = "You press yes";
  } else {
    txt = "Are you sure to quit?";
  }
  alert(txt);
}


function goBlue() {
  var canvas = document.getElementById("firstCanvas");
  canvas.style.backgroundColor = "blue"; 
}

function addText() {
  var canvas =   document.getElementById("firstCanvas");
  var context = canvas.getContext("2d");
  context.font = "30px Arial";
  context.fillText ("hello world!", 50, 100);
}

function clearCanvas() {
  var canvas =   document.getElementById("firstCanvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height)
  canvas.style.backgroundColor = "#FFFFFF";
}

function drawRect() {
  var bar = document.getElementById("drawRect");
  var value = bar.value;
  var canvas =   document.getElementById("firstCanvas");
  var context = canvas.getContext("2d");
  context.fillStyle = "yellow";
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillRect(10, 10, value, value);
}

function doColor() {
  var bar = document.getElementById("colorMap");
  var value = bar.value;
  var canvas =   document.getElementById("firstCanvas");
  canvas.style.backgroundColor = value;
}


function uploadImage() {
  var bar = document.getElementById("fileUpload");
  var canvas = document.getElementById("secondCanvas");
  image = new SimpleImage(bar);
  image.drawTo(canvas);
}

function clearCanvas2() {
  var canvas =   document.getElementById("secondCanvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height)
  canvas.style.backgroundColor = "#FFFFFF";
}

function changeGrey() {
  for (var pixel of image.values()) {
    var avg = (pixel.getGreen() + pixel.getBlue() + pixel.getRed()) / 3;
    pixel.setGreen(avg);
    pixel.setRed(avg);
    pixel.setBlue(avg);
  }
  var canvas =   document.getElementById("secondCanvas");
    image.drawTo(canvas);
}