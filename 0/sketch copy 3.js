let samples = [];
let mSong;
let mBass;

function preload() {
  mSong = loadSound("../assets/Yppah-NeverMessWithSunday_1min.mp3");
  mBass= loadSound("../assets/Yppah-NeverMessWithSunday_1min_Bass.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

    // make separate FFT objects for each sample
    fftSong = new p5.FFT();
    fftBass = new p5.FFT();
}

function draw() {
  background(220, 10);
  
//analyze samples
fftSong.analyze();
fftBass.analyze();


  let energySong = fftSong.getEnergy(1, 5);
  let diamSong = map(energySong, 100, 255, 0, height / 2);
  ellipse(width / 4, height / 4, diamSong);

  let energyBass = fftBass.getEnergy(1, 5);
  let diamBass = map(energyBass, 100, 255, 0, height / 2);
  ellipse(width / 2, height / 2, diamBass);
}

function mouseClicked() {
  if (mSong.isPlaying()) {
    mSong.pause();
  } else {
    mSong.play();
  }

  if (mBass.isPlaying()) {
    mBass.pause();
  } else {
    mBass.play();
  }
}
