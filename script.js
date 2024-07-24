// .querySelector: returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const slider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');


let muteButton = document.getElementById('mute-button');
let musicVolume = 0.5;

// start volume
music.volume = musicVolume;
// checks to see if volume is muted
let toggleOn = true;
//variable to store the sliderValue
let sliderValue;
// stop/pause variable
let isPlaying = false;

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

// volume slider
// oninput method gets the value of the slider and calls the function. 
slider.oninput = function () {
    //stores the slider value
    sliderValue = this.value;
    //checks to see if the music is muted
    if (toggleOn == true) {
        // music volume ranges from 0-1
        musicVolume = (this.value / 100);
        setMusicVolume();
    }
}

//passed the musicVolume variable to the music object volume property (e.g. updates the volume) 
function setMusicVolume() {
    music.volume = musicVolume;
}

// mute function
function muteVolume() {
    muteButton.classList.toggle('fa-volume-mute');
    muteButton.classList.toggle('fa-volume-up');

    if (toggleOn == true) {
        toggleOn = false;
        musicVolume = 0;
        setMusicVolume();

    } else {
        toggleOn = true;
        musicVolume = (sliderValue / 100)
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
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

//update the dom
function loadSong(song) {
    title.textContent = song.title;
    title.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song 
let songIndex = 0;

// Next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();
}

//  On load - select first song from the songs array 
loadSong(songs[songIndex]);

// updates the progress bar and time
function updateProgressBar (e) {
    if (isPlaying) {
        // object destructuring, makes it possible to use only some of the items from an array or object
        // in this case it extracts the duration and currentTime from the source element (which in this case is the song)
        const {duration, currentTime} = e.srcElement;    
        console.log("Duration " + duration, "Current time " + currentTime);
        // update the progress bar
        const progressPercent = (currentTime/duration) * 100;
        // console.log ("progress percentage " + progressPercent)
        // updates the css, uses a template literal as this needs to be passed as a string
        progress.style.width = `${progressPercent}%`;
        // calculates the display for the duration 
        const durationMinutes = Math.floor(duration/60)
        console.log("mins ", durationMinutes);
        // 
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            // adds a zero to the seconds timer if the value is less than 10 seconds 
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);
        
        // Add a delay to stop NAN flashing up as the time is converted to a string
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
                // calculates the display for the duration 
                const currentMinutes = Math.floor(currentTime/60)
                console.log("mins ", currentMinutes);
                // 
                let currentSeconds = Math.floor(currentTime % 60)
                if (currentSeconds < 10) {
                    // adds a zero to the seconds timer if the value is less than 10 seconds 
                    currentSeconds = `0${currentSeconds}`;
                }
                console.log('seconds', currentSeconds);
                currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Even listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
