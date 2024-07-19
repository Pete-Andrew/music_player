// .querySelector: returns the first Element within the document that matches the specified selector, or group of selectors. If no matches are found, null is returned
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;

// Play 
function playSong() {
    isPlaying = true;
    music.play();
}


// Pause 
function pauseSong() {
    isPlaying = false;
    music.pause();
}


// play pause event listener

playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong() ))