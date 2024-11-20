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
  
//analyze samples
fftBass.analyze();
fftDrums.analyze();
fftMelody.analyze();

//bass(blue)
 let energyBass = fftBass.getEnergy(5, 7);
  let diamBass = map(energyBass, 50, 70, 0, height/8);
  strokeWeight(5)
  stroke(20, 30, 200)
  ellipse(width / 2, height / 2, diamBass);

  //drums (orange)
  let energyDrums = fftDrums.getEnergy(200, 250);
  let diamDrums = map(energyDrums, 246, 255, 0, height/1.5);
  stroke(255, 165, 0)
  strokeWeight(3)
  ellipse(width / 2, height / 2, diamDrums);

  //melody (green)
  let energyMelody = fftMelody.getEnergy(6800, 6900); // get energy from the 6800-6900 frequency range
  let diamMelody = map(energyMelody, 30, 50, 0, height/10); // assuming that the 30-50 frequency range is between the loudness of 0-255
  stroke(5, 165, 0)
  strokeWeight(1)
  ellipse(width / 2, height / 2, diamMelody);
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
