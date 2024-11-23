let song;
let samples;

function preload() {
  song = loadSound("../assets/Rynn-Tokyo_3min.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  samples = song.getPeaks();
  print(width, samples.length);
  
  angleMode(DEGREES);  // Switch to degrees for all angle-based functions
}

function draw() {
  background(0);

  for (let idx = 0; idx < samples.length; idx++) {
    let x = map(idx, 0, samples.length - 1, 0, width);
    let h = map(samples[idx], -1, 1, -height / 2, height / 2);
    
    // Map the amplitude to size with added variability
    let size = map(abs(samples[idx]), 0, 1, 10, 20);  // Increase range for size variation
    size += random(-10, 50);  // Add random variation to the size for more dynamic visuals
    size = constrain(size, 5, 15);  // Ensure the size stays within a reasonable range

    // Map the color to amplitude
    let c = map(samples[idx], -1, 1, 255, 0);  // Color based on amplitude
    fill(c, 0, 255 - c, 150);  // Semi-transparent color fill
    noStroke();

// Draw lines based on the current sample
let prevX = map(idx - 1, 0, samples.length - 1, 0, width);
let prevH = map(samples[idx - 1], -1, 1, -height / 2, height / 2) || 0;  // Handle the first sample case
let currentX = x;
let currentH = h;

stroke(255);  // Line color (white)
line(prevX, height / 2 + prevH, currentX, height / 2 + currentH);  // Draw line connecting the current sample to the previous one

    // Alternate between shapes (circle, square, or arc)
    if (idx % 3 === 0) {
      // Draw circle
      ellipse(x, height / 2 + h, size, size);
    } else if (idx % 3 === 1) {
      // Draw square
      rect(x - size / 2, height / 2 + h - size / 2, size, size);
    } else {
      // Draw arc (in degrees)
      let startAngle = map(samples[idx], -1, 1, 0, 360);  // Starting angle based on amplitude in degrees
      let endAngle = startAngle + 90;  // Arc covers 90 degrees (adjust as needed)
      arc(x, height / 2 + h, size * 2, size * 2, startAngle, endAngle);  // Start and end angles are in degrees
    }

  }
}
