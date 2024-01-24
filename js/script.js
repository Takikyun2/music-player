// music play/pause 

// array de objetos

let musics = [
    {
        tittle: "Alchemila",
        autor: "LilaS",
        src: "src/musicas/86 - Eighty Six Part 2 - Ending Full『Alchemilla』by Regal Lily(MP3_320K).mp3",
        cover: "src/cover/eight-six-cover.webp"
    },

    {
        tittle: "Junshin Always",
        autor: "Tadokoro Azusa",
        src: "src/musicas/Always - Musaigen no Phantom World (Ending)(MP3_160K).mp3",
        cover: "src/cover/musaigen-phantom-cover.webp"
    },

    {
        tittle: "Dear my distance",
        autor: "Akari Kitou",
        src: "src/musicas/ED Choujin Koukousei-tachi wa Isekai demo Yoyuu de Ikinuku you desu_  Ending Full「dear my distance」(MP3_320K).mp3",
        cover: "src/cover/choujin-koukousei-cover.jpg"
    },

    {
        tittle: "Haruka Mirai",
        autor: "Kankaku Pierrot",
        src: "src/musicas/Haruka Mirai Last Page Ver(MP3_320K).mp3",
        cover: "src/cover/haruka-mirai-cover.webp"
    },

    {
        tittle: "Kagerou Days",
        autor: "Hatsune Miku",
        src: "src/musicas/Hatsune Miku - KagePro - Kagerou Daze (Legendado)(MP3_160K).mp3",
        cover: "src/cover/kagerou-days-cover.jpg"
    },

    {
        tittle: "World is Mine",
        autor: "Hatsune Miku",
        src: "src/musicas/Hatsune Miku World Is Mine Tradução_Legendado PT-BR(MP3_160K).mp3",
        cover: "src/cover/world-is-mine-cover.jpg"
    },

    {
        tittle: "PoPiPo",
        autor: "Hatsune Miku",
        src: "src/musicas/Hatsune Miku_ Project DIVA Future Tone - [PV] _PoPiPo_ (Romaji_English Subs)(MP3_320K).mp3",
        cover: "src/cover/popipo-cover.webp"
    },

    {
        tittle: "Unknown World Map",
        autor: "Etsuko Yakushimaru",
        src: "src/musicas/High Score Girl 2 _ Ending HD(MP3_160K).mp3",
        cover: "src/cover/highscore-girl-ed2-cover.webp"
    },
];

// variaveis
// var de arquivos e infos
let music = document.querySelector("audio");
let img = document.querySelector(".music-cover");
let musicName = document.querySelector(".music-tittle");
let musicAutor = document.querySelector(".music-autor");

// var de botao

let playBtn = document.querySelector("#play-btn");
let pauseBtn = document.querySelector("#pause-btn");
let previousBtn = document.querySelector("#previous-btn");
let nextBtn = document.querySelector("#next-btn");
let randomBtn = document.querySelector(".random-btn")
let loopBtn = document.querySelector(".loop-btn")
let point = document.querySelector(".point")
//tempos

//tempo atual


//tempo total
let totalTime = document.querySelector(".end");
totalTime.textContent = secondsForMinutes(Math.floor(music.duration));

// var de arr

let indexMusic = 0;
renderMusic(indexMusic);
// eventos e funcoes de play/pause
playBtn.addEventListener("click", playMusic);

function playMusic() {
    music.play();
    pauseBtn.classList.remove("hide");
    playBtn.classList.add("hide");
}

pauseBtn.addEventListener("click", pauseMusic);

function pauseMusic() {
    music.pause();
    pauseBtn.classList.add("hide");
    playBtn.classList.remove("hide");
}

// musica em loop

loopBtn.addEventListener("click", () => {
    loopBtn.classList.toggle("loop-active");
});

// ativar musica aleatoria 

randomBtn.addEventListener("click", () => {
    randomBtn.classList.toggle("random-active");
})

// funcao anonima/ arrow function

// funcao de musica anterior

previousBtn.addEventListener("click", () => {
    indexMusic--;
    if (indexMusic < 0) {
        indexMusic = musics.length - 1
    }
    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
    renderMusic(indexMusic);
    music.play();
});

// condicional para a musica continuar rodando mesmo se acabar

// funcao de proxima musica
nextBtn.addEventListener("click", () => {
    if (randomBtn.classList.contains("random-active") == true) {
        indexMusic = parseInt(Math.random() * musics.length)
    }
    else {
        indexMusic++;
    }

    if (loopBtn.classList.contains("loop-active") == true) {
        indexMusic--;
    }

    if (indexMusic >= musics.length) {
        indexMusic = 0
    }

    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
    renderMusic(indexMusic);
    music.play();
});


// funcao de renderizar musica, img, titulo, e autor

function renderMusic(index) {
    music.setAttribute("src", musics[index].src);
    music.addEventListener("loadeddata", () => {
        musicName.textContent = musics[index].tittle;
        musicAutor.textContent = musics[index].autor;
        img.src = musics[index].cover;
        totalTime.textContent = secondsForMinutes(Math.floor(music.duration));
    }); // esse evento serve para executar uma funcao quando um arquivo carregar, no meu caso a musica 
}
// eventos e funcoes de restreamento de tempo

music.addEventListener("timeupdate", timeDuration);
let progressBar = document.querySelector(".progress-bar")
let progress = document.querySelector(".progress");
let timeNow = document.querySelector(".start");

// progressbar no clique

progressBar.onclick = (e) => {
    let tap = (e.offsetX / progressBar.offsetWidth) * music.duration;
    music.currentTime = tap;
}

point.drag = (e) => {
    let drag = (e.offsetX / progressBar.offsetWidth) * music.duration;
    music.currentTime = drag;
}

function timeDuration() {
    // equacao para tranformar o tempo de segundos para minutos

    progress.style.width = Math.floor((music.currentTime / music.duration) * 100) + "%";
    timeNow.textContent = secondsForMinutes(Math.floor(music.currentTime));

    if (music.ended == true) {
        if (randomBtn.classList.contains("random-active") == true) {
            indexMusic = parseInt(Math.random() * musics.length)
        }
        else {
            indexMusic++;
        }

        if (loopBtn.classList.contains("loop-active") == true) {
            indexMusic--;
        }

        if (indexMusic >= musics.length) {
            indexMusic = 0
        }

        playBtn.classList.add("hide");
        pauseBtn.classList.remove("hide");
        renderMusic(indexMusic);
        music.play();
    }

}

//funcao de transformar segundos em minutos

function secondsForMinutes(seconds) {
    let areaMinutes = Math.floor(seconds / 60);
    let areaSeconds = seconds % 60;
    if (areaSeconds < 10) {
        areaSeconds = "0" + areaSeconds;
    }

    return areaMinutes + ":" + areaSeconds;
}