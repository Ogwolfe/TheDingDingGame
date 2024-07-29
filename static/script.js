const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const modeToggle = document.getElementById('modeToggle');
const muteButton = document.querySelector('.mute-button');

const blurOverlay = document.getElementById('blurOverlay');
const enterButton = document.getElementById('enterButton');

document.body.classList.add('no-scroll');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

muteButton.addEventListener('click', () => {
    muteButton.textContent = muteButton.textContent === '♪' ? '🔇' : '♪';
    console.log('Mute toggled');
});

enterButton.addEventListener('click', () => {
    blurOverlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
        blurOverlay.style.display = 'none';
    }, 500);
});


const gamemusicFiles = [
    './static/audio/Music/Gamemusic001.mp3', './static/audio/Music/Gamemusic002.mp3', './static/audio/Music/Gamemusic003.mp3',
    './static/audio/Music/Gamemusic004.mp3', './static/audio/Music/Gamemusic005.mp3', './static/audio/Music/Gamemusic006.mp3',
    './static/audio/Music/Gamemusic007.mp3', './static/audio/Music/Gamemusic008.mp3', './static/audio/Music/Gamemusic009.mp3',
    './static/audio/Music/Gamemusic010.mp3'
];

const dingFolders = [
    [
        './static/audio/Ding 0/Ding0mamamia.mp3', './static/audio/Ding 0/Ding0thisisatoughthing.mp3', './static/audio/Ding 0/Ding0youcantdothat.mp3',
        './static/audio/Ding 0/Ding0youcanthandlethetruth.mp3', './static/audio/Ding 0/Ding0yourenogood.mp3'
    ],
    [
        './static/audio/Ding 1/Ding1babysurprise.mp3', './static/audio/Ding 1/Ding1barbieworld.mp3', './static/audio/Ding 1/Ding1beautiful.mp3',
        './static/audio/Ding 1/Ding1dontworrythatitsnotgood.mp3', './static/audio/Ding 1/Ding1dontyouworry.mp3', './static/audio/Ding 1/Ding1ihopeyourehavingfun.mp3', './static/audio/Ding 1/Ding1itssoeasyacaveman.mp3', './static/audio/Ding 1/Ding1marvellous.mp3',
        './static/audio/Ding 1/Ding1supernaturaldelight.mp3', './static/audio/Ding 1/Ding1whwnyougitajobtodo.mp3'
    ],
    [
        './static/audio/Ding 2/Ding2aintyoucool.mp3', './static/audio/Ding 2/Ding2cantgetenough.mp3', './static/audio/Ding 2/Ding2celebrate.mp3',
        './static/audio/Ding 2/Ding2feelssogood.mp3', './static/audio/Ding 2/Ding2greatgodinheaven.mp3', './static/audio/Ding 2/Ding2hatisoff.mp3', './static/audio/Ding 2/Ding2iloveyou.mp3', './static/audio/Ding 2/Ding2ineverseensuch.mp3', './static/audio/Ding 2/Ding2itsmagic.mp3',
        './static/audio/Ding 2/Ding2thewonderofitall.mp3'
    ],
    [
        './static/audio/Ding 3/Ding3NEWgreatgod.mp3', './static/audio/Ding 3/Ding3NEWnobodydoesit.mp3', './static/audio/Ding 3/Ding3NEWsuperstar.mp3',
        './static/audio/Ding 3/Ding3NEWtheforce.mp3', './static/audio/Ding 3/Ding3NEWwhatilike.mp3'
    ]
];










let audioPlayer;
let dingPlayer;
let currentTrackIndex = -1;
let dingTimeout;
let isDingMode = true; // Start in Ding mode
let isMuted = false;   // Track mute state
let scoreValue;
let scoreTimeout;
let header;

function playRandomMusic() {
    if (!audioPlayer) {
        audioPlayer = new Audio();
    }

    let newTrackIndex;
    do {
        newTrackIndex = Math.floor(Math.random() * gamemusicFiles.length);
    } while (newTrackIndex === currentTrackIndex && gamemusicFiles.length > 1);

    currentTrackIndex = newTrackIndex;
    audioPlayer.src = gamemusicFiles[currentTrackIndex];
    if (!isMuted) {
        audioPlayer.play();
    }

    if (isDingMode && !isMuted) {
        scheduleDing();
    }
}

function playRandomDing() {
    if (isMuted) return;

    if (!dingPlayer) {
        dingPlayer = new Audio();
    }

    audioPlayer.pause(); // Pause the music

    const randomFolderIndex = Math.floor(Math.random() * dingFolders.length);
    const randomDingIndex = Math.floor(Math.random() * dingFolders[randomFolderIndex].length);
    const dingFile = dingFolders[randomFolderIndex][randomDingIndex];

    dingPlayer.src = dingFile;
    dingPlayer.play();

    updateScoreBox(randomFolderIndex);

    dingPlayer.onended = () => {
        if (!isMuted) {
            audioPlayer.play(); // Resume the music
            if (isDingMode) {
                scheduleDing(); // Schedule the next ding only if still in Ding mode
            }
        }
        resetScoreBox();
    };
}

function scheduleDing() {
    clearTimeout(dingTimeout);
    const nextDingTime = Math.random() * 3000 + 7000; // Random time between 7-10 seconds
    dingTimeout = setTimeout(playRandomDing, nextDingTime);
}

function setupContinuousPlayback() {
    audioPlayer.addEventListener('ended', playRandomMusic);
}

function initAudio() {
    isDingMode = true; // Ensure we start in Ding mode
    isMuted = false;   // Ensure we start unmuted
    scoreValue = document.querySelector('.score-value');
    header = document.querySelector('header');
    playRandomMusic();
    setupContinuousPlayback();
}

function toggleMode() {
    isDingMode = !isDingMode;
    if (isDingMode && !isMuted) {
        scheduleDing(); // Resume scheduling dings
    } else {
        clearTimeout(dingTimeout); // Stop scheduling dings
        if (dingPlayer && !dingPlayer.paused) {
            dingPlayer.pause(); // Stop any playing ding
            resetScoreBox();
            if (!isMuted) {
                audioPlayer.play(); // Resume music if it was interrupted
            }
        }
    }
}

function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        audioPlayer.pause();
        if (dingPlayer) dingPlayer.pause();
        clearTimeout(dingTimeout);
        resetScoreBox();
    } else {
        audioPlayer.play();
        if (isDingMode) scheduleDing();
    }
    updateMuteButtonDisplay();
}

function updateMuteButtonDisplay() {
    const muteButton = document.querySelector('.mute-button');
    muteButton.textContent = isMuted ? '🔇' : '♪';
}

function updateScoreBox(dingIndex) {
    const colors = ['red', 'blue', 'orange', 'green'];
    const color = colors[dingIndex];
    scoreValue.textContent = dingIndex;
    scoreValue.style.backgroundColor = color;
    scoreValue.classList.add('flashing');
    
    // Update header background
    header.style.backgroundColor = color;
    header.classList.add('flashing');
}

function resetScoreBox() {
    clearTimeout(scoreTimeout);
    scoreTimeout = setTimeout(() => {
        scoreValue.textContent = '';
        scoreValue.style.backgroundColor = '#ccc';
        scoreValue.classList.remove('flashing');
        
        // Reset header background
        header.style.backgroundColor = '#ECA400'; // Original header color
        header.classList.remove('flashing');
    }, 300);
}


// Add this event listener to your enter button
document.getElementById('enterButton').addEventListener('click', initAudio);

// Add this event listener to your mode toggle
document.getElementById('modeToggle').addEventListener('change', toggleMode);

// Add this event listener to your mute button
document.querySelector('.mute-button').addEventListener('click', toggleMute);













/*

let audioPlayer;
let dingPlayer;
let currentTrackIndex = -1;
let dingTimeout;
let isDingMode = true; // Start in Ding mode
let isMuted = false;   // Track mute state

function playRandomMusic() {
    if (!audioPlayer) {
        audioPlayer = new Audio();
    }

    let newTrackIndex;
    do {
        newTrackIndex = Math.floor(Math.random() * gamemusicFiles.length);
    } while (newTrackIndex === currentTrackIndex && gamemusicFiles.length > 1);

    currentTrackIndex = newTrackIndex;
    audioPlayer.src = gamemusicFiles[currentTrackIndex];
    if (!isMuted) {
        audioPlayer.play();
    }

    if (isDingMode && !isMuted) {
        scheduleDing();
    }
}

function playRandomDing() {
    if (isMuted) return;

    if (!dingPlayer) {
        dingPlayer = new Audio();
    }

    audioPlayer.pause(); // Pause the music

    const randomFolderIndex = Math.floor(Math.random() * dingFolders.length);
    const randomDingIndex = Math.floor(Math.random() * dingFolders[randomFolderIndex].length);
    const dingFile = dingFolders[randomFolderIndex][randomDingIndex];

    dingPlayer.src = dingFile;
    dingPlayer.play();

    dingPlayer.onended = () => {
        if (!isMuted) {
            audioPlayer.play(); // Resume the music
            if (isDingMode) {
                scheduleDing(); // Schedule the next ding only if still in Ding mode
            }
        }
    };
}

function scheduleDing() {
    clearTimeout(dingTimeout);
    const nextDingTime = Math.random() * 3000 + 7000; // Random time between 7-10 seconds
    dingTimeout = setTimeout(playRandomDing, nextDingTime);
}

function setupContinuousPlayback() {
    audioPlayer.addEventListener('ended', playRandomMusic);
}

function initAudio() {
    isDingMode = true; // Ensure we start in Ding mode
    isMuted = false;   // Ensure we start unmuted
    playRandomMusic();
    setupContinuousPlayback();
}

function toggleMode() {
    isDingMode = !isDingMode;
    if (isDingMode && !isMuted) {
        scheduleDing(); // Resume scheduling dings
    } else {
        clearTimeout(dingTimeout); // Stop scheduling dings
        if (dingPlayer && !dingPlayer.paused) {
            dingPlayer.pause(); // Stop any playing ding
            if (!isMuted) {
                audioPlayer.play(); // Resume music if it was interrupted
            }
        }
    }
}

function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        audioPlayer.pause();
        if (dingPlayer) dingPlayer.pause();
        clearTimeout(dingTimeout);
    } else {
        audioPlayer.play();
        if (isDingMode) scheduleDing();
    }
    updateMuteButtonDisplay();
}

function updateMuteButtonDisplay() {
    const muteButton = document.querySelector('.mute-button');
    muteButton.textContent = isMuted ? '🔇' : '♪';
}

// Add this event listener to your enter button
document.getElementById('enterButton').addEventListener('click', initAudio);

// Add this event listener to your mode toggle
document.getElementById('modeToggle').addEventListener('change', toggleMode);

// Add this event listener to your mute button
document.querySelector('.mute-button').addEventListener('click', toggleMute);


*/