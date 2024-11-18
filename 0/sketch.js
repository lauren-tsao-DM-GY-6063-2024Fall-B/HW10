let mBass;
let mDrums;
let mMelody;
let mOther;

function preload() {
  mBass= loadSound("../assets/Yppah-NeverMessWithSunday_1min_Bass.mp3");
  mDrums = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Drums.mp3");
  mMelody = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Melody.mp3");
  mOther = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Other.mp3");

  // mDrums.setVolume(0.3)
  
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
  
//analyze samples
fftBass.analyze();
fftDrums.analyze();
fftMelody.analyze();

//bass(blue)
 let energyBass = fftBass.getEnergy(2, 50);
  let diamBass = map(energyBass, 100, 255, 0, height / 2);
  ellipse(width / 2, height / 2, diamBass);
  stroke(255, 165, 0)

  //drums (orange)
  let energyDrums = fftDrums.getEnergy(200, 250);
  let diamDrums = map(energyDrums, 200, 250, 0, height);
  ellipse(width / 2, height / 2, diamDrums);
  stroke(5, 165, 0)

  let energyMelody = fftMelody.getEnergy(6000, 6500); // get energy from the 1-5 frequency range
  let diamMelody = map(energyMelody, 50, 100, 0, height / 2); // assuming that the 1-5 frequency range is between the loudness of 0-255
  ellipse(width / 2, height / 4, diamMelody);
  stroke(20, 30, 200)
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
