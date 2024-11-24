let song;
let samples;

function preload() {
  song = loadSound("../assets/Rynn-Tokyo_3min.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  samples = song.getPeaks(); // returns an array of amplitude peaks (the highest and lowest points of a sample, which is 1 to -1 for normalized sound)
  print(width, samples.length);
}

function draw() {
  background(0);

  for (let idx = 0; idx < samples.length; idx++) {
    let x = map(idx, 0, samples.length - 1, 0, width);
    let h = map(samples[idx], -1, 1, -height / 2, height / 2);
    
    // map the size to sample range (-1 to 1)
    let size = map(samples[idx], -1, 1, 7, 9);
    size = random(7, 10);  // randomize size (larger the range, more jittery the animation)

   // map color to sample range (0 to 1)
    let mColor = map(samples[idx], 0, 1, 255, 0);
    
    // draw lines and ellipses
    strokeWeight(size / 20);
    stroke(mColor, 0, 150,);
    
    line(x, height/2, x, height/2 - h);
    fill(mColor + 20, 100, 0, mColor);
  
    stroke(255, 255, 0, 50);
    strokeWeight(8);
    ellipse(x - size / 2, height / 2 + h, size/2);
 
  }
}