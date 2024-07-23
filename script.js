// .querySelector: returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const slider = document.getElementById('volume-slider');
let muteButton = document.getElementById('mute-button');
let musicVolume = 0.5;

// start volume
music.volume = musicVolume;
// checks to see if volume is muted
let toggleOn = true;

let sliderValue;

//Music
//an object within an array
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Metric 1',
        artist: 'Jacinto Design',
    },
]

let isPlaying = false;

// volume slider
// oninput method gets the value of the slider and calls the function. 
slider.oninput = function() { 
    //stores the slider value
    sliderValue = this.value;  
    //checks to see if the music is muted
    if (toggleOn == true) {
    // music volume ranges from 0-1
    musicVolume = (this.value/100);
    setMusicVolume();}
}

//passed the musicVolume variable to the music object volume property (e.g. updates the volume) 
function setMusicVolume () {
    music.volume = musicVolume;
}

// mute function
function muteVolume () {
   muteButton.classList.toggle('fa-volume-mute');
   muteButton.classList.toggle('fa-volume-up');
   
   if (toggleOn == true) {
    toggleOn = false;
    musicVolume = 0;
    setMusicVolume();

   } else { 
    toggleOn = true;
    musicVolume = (sliderValue/100)
    setMusicVolume();
   }
}


// Play 
function playSong() {
    isPlaying = true;
    // .classlist: returns the CSS classnames of an element. It can then be amended by js code
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause 
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play pause event listener with a ternary line to switch between.
playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong() ))

//update the dom
function loadSong(song) {
    title.textContent = song.title;
    title.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song 
let songIndex =0;

// Next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex]);
    playSong();
}

//  On load - select first song from the songs array 
loadSong(songs[songIndex]); 

// Even listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);