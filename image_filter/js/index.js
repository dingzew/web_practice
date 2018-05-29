var image = null;
var file = null;
var pixel = null;
var avgColor = null;
var red = null;
var blue;
var green;

function uploadImage() {
  file = document.getElementById("fileUpload");
  var canvas = document.getElementById("imageCanvas");
  image = new SimpleImage(file);
  image.drawTo(canvas);
}

function doGray() {
  for (pixel of image.values()) {
      var avg = (pixel.getGreen() + pixel.getBlue() + pixel.getRed()) / 3;
      pixel.setGreen(avg);
      pixel.setRed(avg);
      pixel.setBlue(avg);
  }
  var canvas =   document.getElementById("imageCanvas");
  image.drawTo(canvas);
  image = new SimpleImage(file)
}

function reset() {
  var canvas = document.getElementById("imageCanvas");
  image.drawTo(canvas);
}

function doRedSingle() {
    for (pixel of image.values()) {
      var avg = (pixel.getGreen() + pixel.getBlue() + pixel.getRed()) / 3;
      if (avg <= 128) {
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    }
  var canvas =   document.getElementById("imageCanvas");
  image.drawTo(canvas);
  image = new SimpleImage(file)
}

function doIndigo() {
  if (avgColor < 128) {
    red = Math.round(.8 * avgColor);
    green = 0;
    blue = Math.round(2 * avgColor);
  } else {
    red = Math.round(1.2 * avgColor - 51);
    green = Math.round(2*avgColor - 255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doBlue() {
 if (avgColor < 128) {
    red = 0;
    green = 0;
    blue = Math.round(2*avgColor);
  } else {
    red = Math.round(2*avgColor-255);
    green =Math.round(2*avgColor-255);
    blue = 255;
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}
function doGreen() {
  if (avgColor < 128) {
    red = 0;
    green = Math.round(2*avgColor);
    blue = 0;
  } else {
    red = Math.round(2*avgColor-255);
    green = 255;
    blue = Math.round(2*avgColor-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doYellow() {
  if (avgColor < 128) {
    red = Math.round(2 * avgColor);
    green = Math.round(2 * avgColor);
    blue = 0;
  } else {
    red = 255;
    green = 255;
    blue = Math.round(2 * avgColor - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doOrange() {
   if (avgColor < 128) {
    red = Math.round(2 * avgColor);
    green = Math.round(.8 * avgColor);
    blue = 0;
  } else {
    red = 255;
    green = Math.round(1.2 * avgColor - 51);
    blue =  Math.round(2 * avgColor - 255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doRed() {
  if (avgColor < 128) {
    red = Math.round(2*avgColor);
    green = 0;
    blue = 0;
  } else {
    red = 255;
    green = Math.round(2*avgColor-255);
    blue = Math.round(2*avgColor-255);
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

function doViolet() {
  if (avgColor < 128) {
    red = Math.round(1.6 * avgColor);
    green = 0;
    blue = Math.round(1.6 * avgColor);
  } else {
    red = Math.round(0.4 * avgColor + 153 );
    green = Math.round(2 * avgColor - 255);
    blue = Math.round(0.4 * avgColor + 153 );
  }
  pixel.setRed(red);
  pixel.setGreen(green);
  pixel.setBlue(blue);
}

// Main function for Rainbow
function doRainbow() {
    drawRainbow();
    var canvas =   document.getElementById("imageCanvas");
    image.drawTo(canvas);
    image = new SimpleImage(file);
}
//Draw Rainbow
function drawRainbow() {
  var rectHeight = image.getHeight();
  var rectSegment = parseInt(rectHeight) / 7;
  var Y;
  var X;
  for (pixel of image.values()) {
    X = pixel.getX();
    Y = pixel.getY();
//    outImage.setPixel(X, Y, pixel);
    avgColor = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (Y >= 6 * parseInt(rectSegment)) {
      doRed();
    } else if (Y >= (5 * parseInt(rectSegment))) {
      doOrange();
    } else if (Y >= (4 * parseInt(rectSegment))) {
      doYellow();
    } else if (Y >= (3 * parseInt(rectSegment))) {
      doGreen();
    } else if (Y >= (2 * parseInt(rectSegment))) {
      doBlue();
    } else if (Y >= parseInt(rectSegment)) {
      doIndigo();
    } else {
      doViolet();
    }
  }
}