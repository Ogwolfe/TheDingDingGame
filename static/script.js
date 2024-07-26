const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const modeToggle = document.getElementById('modeToggle');
const muteButton = document.querySelector('.mute-button');

<<<<<<< HEAD
    enterButton.addEventListener('click', () => {
        blurOverlay.classList.add('hidden');
        
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
=======
const blurOverlay = document.getElementById('blurOverlay');
const enterButton = document.getElementById('enterButton');

document.body.classList.add('no-scroll');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
>>>>>>> 000fb45 (Rehaul)
});

modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        console.log('Music mode activated');
    } else {
        console.log('Ding mode activated');
    }
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

document.addEventListener('DOMContentLoaded', (event) => {
    const gamemusicFiles = [
        './static/audio/Music/Gamemusic001.mp3', './static/audio/Music/Gamemusic002.mp3', './static/audio/Music/Gamemusic003.mp3',
        './static/audio/Music/Gamemusic004.mp3', './static/audio/Music/Gamemusic005.mp3', './static/audio/Music/Gamemusic006.mp3',
        './static/audio/Music/Gamemusic007.mp3', './static/audio/Music/Gamemusic008.mp3', './static/audio/Music/Gamemusic009.mp3',
        './static/audio/Music/Gamemusic010.mp3'
    ];

    const dingFolders = [
        [
<<<<<<< HEAD
            'audio/Ding 0/Ding0mamamia.mp3', 'audio/Ding 0/Ding0thisisatoughthing.mp3', 'audio/Ding 0/Ding0youcantdothat.mp3',
            'audio/Ding 0/Ding0youcanthandlethetruth.mp3', 'audio/Ding 0/Ding0yourenogood.mp3'
=======
            './static/audio/Ding 0/Ding0mamamia.mp3', './static/audio/Ding 0/Ding0thisisatoughthing.mp3', './static/audio/Ding 0/Ding0youcantdothat.mp3',
            './static/audio/Ding 0/Ding0youcanthandlethetruth.mp3', './static/audio/Ding 0/Ding0yourenogood.mp3'
>>>>>>> 000fb45 (Rehaul)
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
<<<<<<< HEAD
            'audio/Ding 3/Ding3NEWgreatgod.mp3', 'audio/Ding 3/Ding3NEWnobodydoesit.mp3', 'audio/Ding 3/Ding3NEWsuperstar.mp3',
            'audio/Ding 3/Ding3NEWtheforce.mp3', 'audio/Ding 3/Ding3NEWwhatilike.mp3'
        ]
    ];

    const audioPlayer = document.getElementById('audioPlayer');
    const enterButton = document.getElementById('enter-button');
    const toggleCheckbox = document.getElementById('toggle');

    let isMusicMode = false;
=======
            './static/audio/Ding 3/Ding3NEWgreatgod.mp3', './static/audio/Ding 3/Ding3NEWnobodydoesit.mp3', './static/audio/Ding 3/Ding3NEWsuperstar.mp3',
            './static/audio/Ding 3/Ding3NEWtheforce.mp3', './static/audio/Ding 3/Ding3NEWwhatilike.mp3'
        ]
    ];

    const audioPlayer = new Audio();
    const enterButton = document.getElementById('enterButton');
    const modeToggle = document.getElementById('modeToggle');
    const muteButton = document.querySelector('.mute-button');

    let isMusicMode = false;
    let isMuted = false;
>>>>>>> 000fb45 (Rehaul)

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function playRandomGamemusic() {
        const randomFile = getRandomElement(gamemusicFiles);
        const randomTime = Math.floor(Math.random() * 6) + 7; // Random time between 7 and 12 seconds

        audioPlayer.src = randomFile;
        if (!isMuted) audioPlayer.play();

        setTimeout(() => {
<<<<<<< HEAD
            if (toggleCheckbox.checked) {
                playRandomMusic(); // In Music Mode, loop the same random music file
            } else {
                playRandomDing(); // In Ding Mode, play a ding sound
=======
            if (!isMusicMode) {
                playRandomDing();
>>>>>>> 000fb45 (Rehaul)
            }
        }, randomTime * 1000);
    }

    function playRandomDing() {
        const randomFolder = getRandomElement(dingFolders);
        const randomFile = getRandomElement(randomFolder);

        audioPlayer.src = randomFile;
        if (!isMuted) audioPlayer.play();

        audioPlayer.onended = () => {
            playRandomGamemusic();
        };
    }

    function playRandomMusic() {
        const randomFile = getRandomElement(gamemusicFiles);
        audioPlayer.src = randomFile;
<<<<<<< HEAD
        audioPlayer.play();

        audioPlayer.onended = () => {
            if (isMusicMode) {
                playRandomMusic(); // Continue looping in Music Mode
=======
        if (!isMuted) audioPlayer.play();

        audioPlayer.onended = () => {
            if (isMusicMode) {
                playRandomMusic();
>>>>>>> 000fb45 (Rehaul)
            }
        };
    }

    function startPlayback() {
        if (isMusicMode) {
<<<<<<< HEAD
            playRandomMusic(); // Start Music Mode
        } else {
            playRandomGamemusic(); // Start Ding Mode
=======
            playRandomMusic();
        } else {
            playRandomGamemusic();
>>>>>>> 000fb45 (Rehaul)
        }
    }

    enterButton.addEventListener('click', () => {
        startPlayback();
<<<<<<< HEAD
    });

    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            isMusicMode = true;
        } else {
            isMusicMode = false;
        }
        startPlayback(); // Restart playback based on the current mode
=======
>>>>>>> 000fb45 (Rehaul)
    });

    modeToggle.addEventListener('change', () => {
        isMusicMode = modeToggle.checked;
        startPlayback();
    });

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            audioPlayer.pause();
            muteButton.textContent = '🔇';
        } else {
            muteButton.textContent = '♪';
            startPlayback();
        }
    });
});