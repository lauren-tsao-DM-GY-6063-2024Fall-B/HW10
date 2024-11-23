let mBass;
let mDrums;
let mMelody;
let mOther;

// set up arrays for each sample to hold ripple parameters
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
  background(0);

  // analyze samples
  fftBass.analyze();
  fftDrums.analyze();
  fftMelody.analyze();

  // bass (blue)
  let energyBass = fftBass.getEnergy(5, 7); // get energy from the 5 - 7 frequency range
  let diamBass = map(energyBass, 50, 70, 0, height / 5); // assuming that the 5 - 7 frequency range is between the loudness of 50 - 70
  ripplesBass.push({ size: diamBass, alpha: 255, color: color(88, 0, 255) }); // add size, alpha and color properties into rippleBass array

  // drums (orange)
  let energyDrums = fftDrums.getEnergy(200, 250);
  let diamDrums = map(energyDrums, 240, 255, 0, height);
  ripplesDrums.push({ size: diamDrums, alpha: 255, color: color(255, 198, 0) });

  // melody (pink)
  let energyMelody = fftMelody.getEnergy(6800, 6900); 
  let diamMelody = map(energyMelody, 30, 50, 0, height / 10)
  ripplesMelody.push({ size: diamMelody, alpha: 255, color: color(233, 0, 255) });

  // Draw ripples based on the established bass, drums, and melody frequency ranges above
  drawBRipples(ripplesBass);
  drawDRipples(ripplesDrums);
  drawMRipples(ripplesMelody);
}

//// MAKING FUNCTIONS TO DRAW RIPPLES

// function to draw bass ripples
function drawBRipples(ripplesBass) {
  for (let i = ripplesBass.length - 1; i >= 0; i--) { // - 1 because it the first element starts at 0, not 1
    let rippleB = ripplesBass[i]; // make a rippleB variable to extract out properties from ripplesBass array
    stroke(rippleB.color.levels[0], rippleB.color.levels[1], rippleB.color.levels[2], rippleB.alpha); // 0-2 meaning RGB, alpha is separate to fade out later
    strokeWeight(0.8);
    ellipse(width / 2, height / 2, rippleB.size);

    rippleB.size *= 1; // reduce the size of bass ripples by 0.99 over time
    rippleB.alpha -= 5; // reduce alpha of bass ripples by 20
  }
}

// function to draw drums ripples
function drawDRipples(ripplesDrums) {
  for (let i = ripplesDrums.length - 1; i >= 0; i--) {
    let rippleD = ripplesDrums[i];
    stroke(rippleD.color.levels[0], rippleD.color.levels[1], rippleD.color.levels[2], rippleD.alpha);
    strokeWeight(5);
    ellipse(width / 2, height / 2, rippleD.size);

    rippleD.size *= 0.99;
    rippleD.alpha -= 30;
  }
}

// function to draw melody ripples
function drawMRipples(ripplesMelody) {
  for (let i = ripplesMelody.length - 1; i >= 0; i--) {
    let rippleM = ripplesMelody[i];
    stroke(rippleM.color.levels[0], rippleM.color.levels[1], rippleM.color.levels[2], rippleM.alpha);
    strokeWeight(10);
    ellipse(width / 2, height / 2, rippleM.size);

    rippleM.size *= 0.99;
    rippleM.alpha -= 20;
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
