let melody, bass, drums, others, mSong;
let fftMelody, fftBass, fftDrums, fftOthers;

function preload() {
  // Load individual audio files
  melody = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Melody.mp3");
  bass = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Bass.mp3");
  drums = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Drums.mp3");
  others = loadSound("../assets/Yppah-NeverMessWithSunday_1min_Others.mp3");
  mSong = loadSound("../assets/Yppah-NeverMessWithSunday_1min.mp3");

  // Create separate FFT objects for each sample
  fftMelody = new p5.FFT();
  fftBass = new p5.FFT();
  fftDrums = new p5.FFT();
  fftOthers = new p5.FFT();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  // Optionally start playing the samples (either loop them or play them once)
  melody.loop();
  bass.loop();
  drums.loop();
  others.loop();
}

function draw() {
  background(220, 10);

  // Analyze each sample separately
  fftMelody.setInput(melody);
  fftBass.setInput(bass);
  fftDrums.setInput(drums);
  fftOthers.setInput(others);

  // Get energy levels for each sample in different frequency ranges
  let energyMelody = fftMelody.getEnergy(200, 1000);  // Melody frequencies
  let energyBass = fftBass.getEnergy(20, 200);        // Bass frequencies
  let energyDrums = fftDrums.getEnergy(150, 600);     // Drums frequencies
  let energyOthers = fftOthers.getEnergy(600, 1500);  // Others frequencies

  // Map energy values to visual size (diameter of circles)
  let diamMelody = map(energyMelody, 0, 255, 0, height / 2);
  let diamBass = map(energyBass, 0, 255, 0, height / 2);
  let diamDrums = map(energyDrums, 0, 255, 0, height / 2);
  let diamOthers = map(energyOthers, 0, 255, 0, height / 2);

  // Draw circles representing energy levels
  fill(255, 0, 0, 150);  // Red for Melody
  ellipse(width / 4, height / 4, diamMelody);

  fill(0, 0, 255, 150);  // Blue for Bass
  ellipse(width / 4 * 3, height / 4, diamBass);

  fill(0, 255, 0, 150);  // Green for Drums
  ellipse(width / 4, 3 * height / 4, diamDrums);

  fill(255, 255, 0, 150);  // Yellow for Others
  ellipse(width / 4 * 3, 3 * height / 4, diamOthers);
}

function mouseClicked() {
  // Toggle playback for each individual sound
  if (melody.isPlaying()) {
    melody.pause();
  } else {
    melody.loop();
  }

  if (bass.isPlaying()) {
    bass.pause();
  } else {
    bass.loop();
  }

  if (drums.isPlaying()) {
    drums.pause();
  } else {
    drums.loop();
  }

  if (others.isPlaying()) {
    others.pause();
  } else {
    others.loop();
  }
}
