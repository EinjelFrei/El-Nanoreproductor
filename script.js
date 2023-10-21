function createsongs(artistName, title, audioPath, artisImage) {
    this.artistName = artistName;
    this.artisImage = artisImage;
    this.title = title;
    this.song = new Audio(audioPath);

    this.getDuration = function () {
        return this.song.duration;
    };
}

let songs = [
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
    new createsongs("Melendi","Magic Alonso", "songs/nano.mp3","img/nano.png"),
];

// Función para comparar el nombre del artista de dos canciones
function compareArtists(a, b) {
    if (a.artistName < b.artistName) {
        return -1;
    }
    if (a.artistName > b.artistName) {
        return 1;
    }
    return 0;
}

// Ordena el array songs por el nombre del artista
songs.sort(compareArtists);

let elementsPerPage = 3;
let totalPages = Math.ceil(songs.length / elementsPerPage);
let currentPage = 1;
let artistNameElement = document.getElementById("artist-name");
let artistImageElement = document.getElementById("artist-image");
let songTitleElement = document.getElementById("song-title");
let playButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");
let audioPlayer = new Audio();
let progressBar = document.getElementById('progress'); // Barra de progreso
let previousButton = document.getElementById("previous-button");
let nextButton = document.getElementById("next-button");
let loopButton = document.getElementById("loop-button");
let randomButton = document.getElementById("random-button");
let volumeSlider = document.getElementById("sliderVolumen");
let volumeButton = document.getElementById("volume-button");
let songListElement = document.getElementById("song-list");
let currentSongIndex = 0;
let isLooping = false;
let isRandom = false;
let isMuted = false;

volumeButton.addEventListener("click", toggleMute);
function toggleMute() {
    if (isMuted) {
        audioPlayer.volume = 0.1; // Establecer el volumen al 50% al desmutear
        volumeSlider.value = 10; // Actualizar el control deslizante de volumen al 50%
        volumeButton.className = "bx bxs-volume-full";
    } else {
        audioPlayer.volume = 0;
        volumeSlider.value = 0; // Actualizar el control deslizante de volumen a 0 al silenciar
        volumeButton.className = "bx bxs-volume-mute";
    }
    isMuted = !isMuted;
}

playButton.style.display = "inline-block"; // Mostrar el botón de play por defecto
pauseButton.style.display = "none"; // Ocultar el botón de pause por defecto

loopButton.addEventListener("click", toggleLoop);
randomButton.addEventListener("click", playRandomSong);
audioPlayer.addEventListener("ended", playNextSong);

audioPlayer.addEventListener("play", () => {
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    artistImageElement.classList.add("rotating");
});

audioPlayer.addEventListener("pause", () => {
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    artistImageElement.classList.remove("rotating");
});

progressBar.addEventListener("input", () => {
    const currentTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = currentTime;
});

volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    if (volume > 0) {
        isMuted = false; // Desactivar el modo silencio si el volumen es mayor que cero
        volumeButton.className = "bx bxs-volume-full";
    }
});

const updateProgress = () => {
    if (audioPlayer.currentTime > 0) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;

        var durationSeconds = Math.floor(audioPlayer.duration);
        var currentSeconds = Math.floor(audioPlayer.currentTime);

        var formattedDuration = secondsToString(durationSeconds);
        var formattedCurrentTime = secondsToString(currentSeconds);

        document.getElementById('current-time').innerText = formattedCurrentTime;
        document.getElementById('song-duration').innerText = formattedDuration;
    }
    if (audioPlayer.ended) {
        playNextSong();
    }
};

audioPlayer.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", playSong);
pauseButton.addEventListener("click", pauseSong);

previousButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

function toggleLoop() {
    isLooping = !isLooping;
    audioPlayer.loop = isLooping;
    loopButton.classList.toggle("active", isLooping);

    if (isLooping) {
        loopButton.style.color = "#FF11A0";
    } else {
        loopButton.style.backgroundColor = "";
        loopButton.style.color = "";
    }
}

function loadSong(songIndex) {
    let song = songs[songIndex];
    artistNameElement.textContent = song.artistName;
    artistImageElement.style.backgroundImage = `url(${song.artisImage})`;
    songTitleElement.textContent = song.title;
    audioPlayer.src = song.song.src;
    audioPlayer.load();
    audioPlayer.addEventListener("loadedmetadata", showDuration);
    showDuration();
}

function playSong() {
    audioPlayer.play();
}

function pauseSong() {
    audioPlayer.pause();
}

function secondsToString(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function showSongsOnPage(page) {
    songListElement.innerHTML = "";

    let start = (page - 1) * elementsPerPage;
    let fin = start + elementsPerPage;
    let songOnPage = songs.slice(start, fin);

    songOnPage.forEach((song, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${song.artistName} - ${song.title}`;
        listItem.addEventListener("click", () => {
            loadSong(index + start);
            playSong();
        });
        songListElement.appendChild(listItem);
    });
}

function createPaginationLinks() {
    let paginationElement = document.getElementById("pagination");

    paginationElement.innerHTML = "";

    let prevButton = document.createElement("a");
    prevButton.href = "#";
    prevButton.textContent = "Anterior";
    prevButton.classList.add("prev-next");
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showSongsOnPage(currentPage);
            createPaginationLinks();
        }
    });

    let nextButton = document.createElement("a");
        nextButton.href = "#";
        nextButton.textContent = "Siguiente";
        nextButton.classList.add("prev-next");
        nextButton.addEventListener("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                showSongsOnPage(currentPage);
                createPaginationLinks();
            }
        });
        paginationElement.appendChild(prevButton);
        
        for (let i = 1; i <= totalPages; i++) {
        let link = document.createElement("a");
        link.href = "#";
        link.textContent = i;

        link.addEventListener("click", () => {
            currentPage = i;
            showSongsOnPage(currentPage);
            createPaginationLinks();
        });

        if (i === currentPage) {
            link.classList.add("active");
        }

        paginationElement.appendChild(link);
    }
    paginationElement.appendChild(nextButton);
}

function showDuration() {
    let duration = audioPlayer.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    let durationFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById("song-duration").textContent = durationFormatted;
}

function playNextSong() {
    if (!isLooping) {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    }
}

function playRandomSong() {
    pauseSong();

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);

    currentSongIndex = randomIndex;

    let newSong = songs[currentSongIndex];
    artistNameElement.textContent = newSong.artistName;
    artistImageElement.style.backgroundImage = `url(${newSong.artisImage})`;
    songTitleElement.textContent = newSong.title;
    audioPlayer.src = newSong.song.src;
    playSong();
}

showSongsOnPage(currentPage);
createPaginationLinks();
loadSong(currentSongIndex);
