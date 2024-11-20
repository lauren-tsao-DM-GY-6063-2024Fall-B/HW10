let mBass;
let mDrums;
let mMelody;
let mOther;

// Arrays to track the ripple parameters
let ripplesBass = [];
let ripplesDrums = [];
let ripplesMelody = [];

function preload() {
  mBass = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Bass.mp3");
  mDrums = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Drums.mp3");
  mMelody = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Melody.mp3");
  mOther = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Other.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  // make separate FFT objects for each sample
  fftBass = new p5.FFT();
  fftDrums = new p5.FFT();
  fftMelody = new p5.FFT();
}

function draw() {
  background(0); // Use a semi-transparent background to allow previous ripples to show through
  
  // Analyze audio samples
  fftBass.analyze();
  fftDrums.analyze();
  fftMelody.analyze();

  // Bass (blue) ripple effect
  let energyBass = fftBass.getEnergy(5, 7);
  let diamBass = map(energyBass, 50, 70, 0, height / 5);
  // Store ripple
  ripplesBass.push({ size: diamBass, alpha: 255 });

  // Drums (orange) ripple effect
  let energyDrums = fftDrums.getEnergy(200, 250);
  let diamDrums = map(energyDrums, 240, 255, 0, height);
  // Store ripple
  ripplesDrums.push({ size: diamDrums, alpha: 255 });

  // Melody (green) ripple effect
  let energyMelody = fftMelody.getEnergy(6800, 6900); // get energy from the 6800-6900 frequency range
  let diamMelody = map(energyMelody, 30, 50, 0, height / 10);
  // Store ripple
  ripplesMelody.push({ size: diamMelody, alpha: 255 });

  // Draw ripples for each frequency range
  drawRipples(ripplesBass, color(88, 0, 255)); // Blue for bass
  drawRipples(ripplesDrums, color(255, 198, 0)); // Orange for drums
  drawRipples(ripplesMelody, color(233, 0, 255)); // Green for melody
}

function drawRipples(ripples, col) {
  // Loop through each ripple and draw it
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    stroke(col.levels[0], col.levels[1], col.levels[2], ripple.alpha); // Use the color passed in
    strokeWeight(0.8);
    ellipse(width / 2, height / 2, ripple.size);
    
    // Decrease the size and opacity to create the ripple fading effect
    ripple.size *= 0.98; // Shrink the size over time
    ripple.alpha -= 5; // Fade out the ripple
  }
}

function mouseClicked() {
  if (mBass.isPlaying()) {
    mBass.pause();
  } else {
    mBass.play();
  }

  if (mDrums.isPlaying()) {
    mDrums.pause();
  } else {
    mDrums.play();
  }

  if (mMelody.isPlaying()) {
    mMelody.pause();
  } else {
    mMelody.play();
  }

  if (mOther.isPlaying()) {
    mOther.pause();
  } else {
    mOther.play();
  }
}
