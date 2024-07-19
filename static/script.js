document.addEventListener('DOMContentLoaded', (event) => {
    const enterButton = document.getElementById('enter-button');
    const blurOverlay = document.getElementById('blur-overlay');
    const content = document.getElementById('content');

    enterButton.addEventListener('click', () => {
        blurOverlay.classList.add('hidden');
        
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const gamemusicFiles = [
        'audio/Music/Gamemusic001.mp3', 'audio/Music/Gamemusic002.mp3', 'audio/Music/Gamemusic003.mp3',
        'audio/Music/Gamemusic004.mp3', 'audio/Music/Gamemusic005.mp3', 'audio/Music/Gamemusic006.mp3',
        'audio/Music/Gamemusic007.mp3', 'audio/Music/Gamemusic008.mp3', 'audio/Music/Gamemusic009.mp3',
        'audio/Music/Gamemusic010.mp3'
    ];

    const dingFolders = [
        [
            'audio/Ding 0/Ding0mamamia.mp3', 'audio/Ding 0/Ding0thisisatoughthing.mp3', 'audio/Ding 0/Ding0youcantdothat.mp3',
            'audio/Ding 0/Ding0youcanthandlethetruth.mp3', 'audio/Ding 0/Ding0yourenogood.mp3'
        ],
        [
            'audio/Ding 1/Ding1babysurprise.mp3', 'audio/Ding 1/Ding1barbieworld.mp3', 'audio/Ding 1/Ding1beautiful.mp3',
            'audio/Ding 1/Ding1dontworrythatitsnotgood.mp3', 'audio/Ding 1/Ding1dontyouworry.mp3', 'audio/Ding 1/Ding1ihopeyourehavingfun.mp3', 'audio/Ding 1/Ding1itssoeasyacaveman.mp3', 'audio/Ding 1/Ding1marvellous.mp3',
            'audio/Ding 1/Ding1supernaturaldelight.mp3', 'audio/Ding 1/Ding1whwnyougitajobtodo.mp3'
        ],
        [
            'audio/Ding 2/Ding2aintyoucool.mp3', 'audio/Ding 2/Ding2cantgetenough.mp3', 'audio/Ding 2/Ding2celebrate.mp3',
            'audio/Ding 2/Ding2feelssogood.mp3', 'audio/Ding 2/Ding2greatgodinheaven.mp3', 'audio/Ding 2/Ding2hatisoff.mp3', 'audio/Ding 2/Ding2iloveyou.mp3', 'audio/Ding 2/Ding2ineverseensuch.mp3', 'audio/Ding 2/Ding2itsmagic.mp3',
            'audio/Ding 2/Ding2thewonderofitall.mp3'
        ],
        [
            'audio/Ding 3/Ding3NEWgreatgod.mp3', 'audio/Ding 3/Ding3NEWnobodydoesit.mp3', 'audio/Ding 3/Ding3NEWsuperstar.mp3',
            'audio/Ding 3/Ding3NEWtheforce.mp3', 'audio/Ding 3/Ding3NEWwhatilike.mp3'
        ]
    ];

    const audioPlayer = document.getElementById('audioPlayer');
    const enterButton = document.getElementById('enter-button');
    const toggleCheckbox = document.getElementById('toggle');

    let isMusicMode = false;

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function playRandomGamemusic() {
        const randomFile = getRandomElement(gamemusicFiles);
        const randomTime = Math.floor(Math.random() * 11) + 10; // Random time between 10 and 20 seconds

        audioPlayer.src = randomFile;
        audioPlayer.play();

        setTimeout(() => {
            if (toggleCheckbox.checked) {
                playRandomMusic(); // In Music Mode, loop the same random music file
            } else {
                playRandomDing(); // In Ding Mode, play a ding sound
            }
        }, randomTime * 1000);
    }

    function playRandomDing() {
        const randomFolder = getRandomElement(dingFolders);
        const randomFile = getRandomElement(randomFolder);

        audioPlayer.src = randomFile;
        audioPlayer.play();

        audioPlayer.onended = () => {
            playRandomGamemusic();
        };
    }

    function playRandomMusic() {
        const randomFile = getRandomElement(gamemusicFiles);
        audioPlayer.src = randomFile;
        audioPlayer.play();

        audioPlayer.onended = () => {
            if (isMusicMode) {
                playRandomMusic(); // Continue looping in Music Mode
            }
        };
    }

    function startPlayback() {
        if (isMusicMode) {
            playRandomMusic(); // Start Music Mode
        } else {
            playRandomGamemusic(); // Start Ding Mode
        }
    }

    enterButton.addEventListener('click', () => {
        startPlayback();
    });

    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            isMusicMode = true;
        } else {
            isMusicMode = false;
        }
        startPlayback(); // Restart playback based on the current mode
    });
});
