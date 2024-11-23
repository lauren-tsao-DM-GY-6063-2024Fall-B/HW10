let song;
let samples;

function preload() {
  song = loadSound("../assets/TheMidnight_Jason_featNikkiFlores_3min.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  samples = song.getPeaks();
  print(width, samples.length);
}

function draw() {
  background(220, 60);

  for (let idx = 0; idx < samples.length; idx++) {
    let x = map(idx, 0, samples.length - 1, 0, width);
    let h = map(samples[idx], -1, 1, -height / 2, height / 2);
    
    // Map the amplitude to size and color
    let size = map(abs(samples[idx]), 0, 1, 5, 50);  // Size of the circle based on amplitude
    let c = map(samples[idx], -1, 1, 0, 255);  // Color based on amplitude
    fill(c, 0, 255 - c, 150);  // Semi-transparent color fill
    noStroke();
    
    ellipse(x, height / 2 + h, size, size);  // Draw circles
  }
 
}

