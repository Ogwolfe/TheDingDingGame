
document.getElementById('enter-button').addEventListener('click', function() {
    document.getElementById('blur-overlay').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Enable scrolling on the body
    document.documentElement.style.overflow = 'auto'; // Enable scrolling on the html

    console.log('Overflow for body:', document.body.style.overflow);
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
            'audio/Ding 0/Ding0thehumanity.mp3', 'audio/Ding 0/Ding0thisisatoughthing.mp3', 'audio/Ding 0/Ding0youcantdothat.mp3'
        ],
        [
            'audio/Ding 1/Ding1babysurprise.mp3', 'audio/Ding 1/Ding1barbieworld.mp3', 'audio/Ding 1/Ding1beautiful.mp3'
        ],
        [
            'audio/Ding 2/Ding2aintyoucool.mp3', 'audio/Ding 2/Ding2cantgetenough.mp3', 'audio/Ding 2/Ding2celebrate.mp3'
        ],
        [
            'audio/Ding 3/Ding3itsamiracle.mp3', 'audio/Ding 3/Ding3loveyahoney.mp3', 'audio/Ding 3/Ding3nobodydoesitbetter.mp3'
        ]
    ];

    const audioPlayer = document.getElementById('audioPlayer');
    const enterButton = document.getElementById('enter-button');

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function playRandomGamemusic() {
        const randomFile = getRandomElement(gamemusicFiles);
        const randomTime = Math.floor(Math.random() * 11) + 10; // Random time between 10 and 20 seconds

        audioPlayer.src = randomFile;
        audioPlayer.play();

        setTimeout(() => {
            playRandomDing();
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

    enterButton.addEventListener('click', () => {
        playRandomGamemusic();
    });
});
