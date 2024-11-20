let mBass;
let mDrums;
let mMelody;
let mOther;

function preload() {
  mBass= loadSound("../assets/Yppah-NeverMessWithSunday_1min_Bass.mp3");
  mDrums = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Drums.mp3");
  mMelody = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Melody.mp3");
  mOther = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Other.mp3");

  // mDrums.setVolume(1.2)
  
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
  background(220, 10);

  // Analyze samples
  fftBass.analyze();
  fftDrums.analyze();
  fftMelody.analyze();

  let maxEchoCount = 10; // Number of echoes

  // bass (blue)
  let energyBass = fftBass.getEnergy(5, 7);
  let diamBass = map(energyBass, 50, 70, 0, height / 8);

  for (let i = 0; i < maxEchoCount; i++) {
    // Adjust the rate of scaling here (slower decay)
    let echoDiam = diamBass * 0.2; // Slower scaling (use 0.02 instead of 0.1)
    let echoAlpha = map(i, 0, maxEchoCount - 1, 255, 50); // Fade out opacity
    strokeWeight(5);
    stroke(20, 30, 200, echoAlpha); // Set the alpha for transparency
    ellipse(width / 2, height / 2, echoDiam);
  }

  // drums (orange)
  let energyDrums = fftDrums.getEnergy(200, 250);
  let diamDrums = map(energyDrums, 246, 255, 0, height / 1.5);

  for (let i = 0; i < maxEchoCount; i++) {
    // Adjust the rate of scaling here (slower decay)
    let echoDiam = diamDrums * (1 - i * 0.02); // Slower scaling (use 0.02 instead of 0.1)
    let echoAlpha = map(i, 0, maxEchoCount - 1, 255, 50); // Fade out opacity
    stroke(255, 165, 0, echoAlpha); // Set the alpha for transparency
    strokeWeight(3);
    ellipse(width / 2, height / 2, echoDiam);
  }

  // melody (green)
  let energyMelody = fftMelody.getEnergy(6800, 6900);
  let diamMelody = map(energyMelody, 30, 50, 0, height / 10);

  for (let i = 0; i < maxEchoCount; i++) {
    // Adjust the rate of scaling here (slower decay)
    let echoDiam = diamMelody * (1 - i * 0.02); // Slower scaling (use 0.02 instead of 0.1)
    let echoAlpha = map(i, 0, maxEchoCount - 1, 255, 50); // Fade out opacity
    stroke(5, 165, 0, echoAlpha); // Set the alpha for transparency
    strokeWeight(1);
    ellipse(width / 2, height / 2, echoDiam);
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
