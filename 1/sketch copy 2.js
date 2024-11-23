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

  beginShape();
  for (let idx = 0; idx < samples.length; idx++) {
    let x = map(idx, 0, samples.length - 1, 0, width);
    let h = map(samples[idx], -1, 1, -height / 2, height / 2);
    vertex(x, height/2+h);
  }
  endShape();  
}
