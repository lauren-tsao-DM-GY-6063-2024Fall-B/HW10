let samples = [];
let fftMelody;
let fftBass;
let fftDrums;
let fftOthers;
let mSong;

function preload() {
  samples[0] = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Melody.mp3");
  samples[1] = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Bass.mp3");
  samples[2] = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Drums.mp3");
  samples[3] = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Others.mp3");
  mSong = loadSound("../assets/Yppah-NeverMessWithSunday_1min.mp3");

  // make separate FFT objects for each sample
  fftMelody = new p5.FFT();
  fftBass = new p5.FFT();
  fftDrums = new p5.FFT();
  fftOthers = new p5.FFT();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(220, 10);
  
//analyze samples
fftMelody.analyze(); 
fftBass.analyze();  
fftDrums.analyze();  
fftOthers.analyze();  


  let energyMelody = fftMelody.getEnergy(1000);
  let diamMelody = map(energyMelody, 0, 255, 0, height / 2);
  ellipse(width / 4, height / 4, diamMelody);


  let energyBass = fftBass.getEnergy(1, 100);
  let diamBass = map(energyBass, 0, 255, 0, height / 2);
  ellipse(width / 4 * 3, height / 4, diamBass);


  let energyDrums = fftDrums.getEnergy(200, 500);
  let diamDrums = map(energyDrums, 0, 255, 0, height / 2);
  ellipse(width / 4, 3 * height / 4, diamDrums); 

  let energyOthers = fftOthers.getEnergy(500, 1000);
  let diamOthers = map(energyOthers, 0, 255, 0, height / 2);
  ellipse(width / 4 * 3, 3 * height / 4, diamOthers); 
}

function mouseClicked() {
  // Toggle playback for each song when mouse is clicked
  for (let i = 0; i < samples.length; i++) {
    if (samples[i].isPlaying()) {
      samples[i].pause();
    } else {
      samples[i].play();
    }
  }
}
