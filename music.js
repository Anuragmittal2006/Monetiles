const playPauseButton = document.getElementById('play-pause');
const musicSelect = document.getElementById('music-select');
const songs = [
    'song 2.mp3',
    'song 3.mp3',
    'song 4.mp3',
    'song 5.mp3'
];
let currentSongIndex = 0;
let isPlaying = true;

function saveState() {
    localStorage.setItem('currentSongIndex', currentSongIndex);
    localStorage.setItem('isPlaying', isPlaying);
    localStorage.setItem('currentTime', audio.currentTime);
}

function loadState() {
    if (localStorage.getItem('currentSongIndex') !== null) {
        currentSongIndex = parseInt(localStorage.getItem('currentSongIndex'));
        isPlaying = localStorage.getItem('isPlaying') === 'true';
        audio.currentTime = parseFloat(localStorage.getItem('currentTime'));
    }
}

let audio = new Audio(songs[currentSongIndex]);
loadState();

if (isPlaying) {
    audio.play();
    playPauseButton.textContent = 'Pause';
} else {
    playPauseButton.textContent = 'Play';
}

audio.loop = false; // Disable the default loop

audio.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex];
    audio.play();
    saveState();
});

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audio.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
    saveState();
});

musicSelect.addEventListener('change', () => {
    audio.musicSelect.value;
    audio.play();
    currentSongIndex = songs.indexOf(musicSelect.value);
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
    saveState();
});

window.addEventListener('beforeunload', saveState);
