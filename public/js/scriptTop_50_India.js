let songIndex = 1;
let audioElement = new Audio("/songs/Top_50_India/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Chaleya", filePath: "/songs/Top_50_India/1.mp3", coverPath: "/images/Top_50_India1.jpeg" },
    { songName: "Dhindora Baje Re", filePath: "/songs/Top_50_India/2.mp3", coverPath: "/images/Top_50_India2.jpg" },
    { songName: "Heart Throb", filePath: "/songs/Top_50_India/3.mp3", coverPath: "/images/Top_50_India3.jpeg" },
    { songName: "Light Time", filePath: "/songs/Top_50_India/4.mp3", coverPath: "/images/Top_50_India4.jpg" },
    { songName: "Maan Meri Jaan", filePath: "/songs/Top_50_India/5.mp3", coverPath: "/images/Top_50_India5.jpeg" },
    { songName: "Unchi Unchi Waadi", filePath: "/songs/Top_50_India/6.mp3", coverPath: "/images/Top_50_India6.jpeg" },
    { songName: "Raatan Lambiyan", filePath: "/songs/Top_50_India/7.mp3", coverPath: "/images/Top_50_India7.jpeg" },
    { songName: "Tere Vaaste", filePath: "/songs/Top_50_India/8.mp3", coverPath: "/images/Top_50_India8.jpeg" },
    { songName: "Phir Aur Kya Chahiye", filePath: "/songs/Top_50_India/9.mp3", coverPath: "/images/Top_50_India9.jpeg" },
    { songName: "Tum Kya Mile", filePath: "/songs/Top_50_India/10.mp3", coverPath: "/images/Top_50_India10.jpeg" }
];

// To update song names in the web page according to the array
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Do play/pause on click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText=songs[songIndex-1].songName;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change the playing point when clicking on the progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play the next song when the current song ends
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length) {
        songIndex = 1;
    } else {
        songIndex = songIndex + 1;
    }
    audioElement.src = `/songs/Top_50_India/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
});

// Function to reset play icons for all songs
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Add click event listeners to play/pause icons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `/songs/Top_50_India/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex - 1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
        } else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
        }
    });
});

// Add click event listeners for next and previous buttons
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length) {
        songIndex = 1;
    } else {
        songIndex = songIndex + 1;
    }
    audioElement.src = `/songs/Top_50_India/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = songs.length;
    } else {
        songIndex = songIndex - 1;
    }
    audioElement.src = `/songs/Top_50_India/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');

// Update the time live as music is playing
audioElement.addEventListener('timeupdate', () => {
    let music_curr = audioElement.currentTime;
    let music_duration = audioElement.duration;

    let min1 = Math.floor(music_duration / 60);
    let sec1 = Math.floor(music_duration % 60);

    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;
    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;
});

// Add looping feature for a song using a boolean flag
audioElement.loop = false;
document.getElementById('loop').addEventListener('click', () => {
    if (audioElement.loop == false) {
        audioElement.loop = true;
        loop.style.color = "green";
    } else {
        audioElement.loop = false;
        loop.style.color = 'white';
    }
});