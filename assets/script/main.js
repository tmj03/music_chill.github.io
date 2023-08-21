const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('.container__name-song')
const cdThumb = $('.container__music-img')
const audio = $('#audio')

const playBtn = $('.playBtn')
const player = $('.player')
const played = $('.played')

const prevBtn = $('.fa-backward-step')
const nextBtn = $('.fa-forward-step')
const randomBtn = $('.fa-shuffle')

const progress = $('#progress')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Fade',
            singer: 'Alan Walker',
            path:'./assets/Alan_walker/music/song1/Faded.mp3',
            image: './assets/Alan_walker/img_music/img_song1/Faded.png',
            album: 'Different World',
            time: '03:32'
        },
        {
            name: 'Lily',
            singer: 'Alan Walker',
            path:'./assets/Alan_walker/music/song2/Lily.mp3',
            image: './assets/Alan_walker/img_music/img_song2/Lily.jpg',
            album: 'Different World',
            time: '03:32'
        },
        {
            name: 'Sing Me To Sleep',
            singer: 'Alan Walker',
            path:'./assets/Alan_walker/music/song3/SingMetoSleep.mp3',
            image: './assets/Alan_walker/img_music/img_song3/Sing_Me_to_Sleep.png',
            album: 'Different World',
            time: '03:32'
        },
        {
            name: 'Force',
            singer: 'Alan Walker',
            path:'././assets/Alan_walker/music/song4/Force-Alan-Walker.mp3',
            image: './assets/Alan_walker/img_music/img_song2/Lily.jpg',
            album: 'Different World',
            time: '03:32'
        },
        {
            name: 'Spectre',
            singer: 'Alan Walker',
            path:'./assets/Alan_walker/music/song5/Spectre-Alan-Walker.mp3',
            image: './assets/Alan_walker/img_music/img_song3/Sing_Me_to_Sleep.png',
            album: 'Different World',
            time: '03:32'
        }
    ],

    render: function() {
       const htmls = this.songs.map(song => {
           return `
                <div class="Song">
                    <div class="song__infor">
                        <span class="Song__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
                                <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                            </svg>
                        </span>
                        <img src="${song.image}" alt="" class="Song__img">
                        <div class="Song__content">
                            <h3 class="Song__name">${song.name}</h3>
                            <span class="Song__singer">${song.singer}</span>
                        </div>
                    </div>
                    <div class="song__album">${song.album}</div>
                    <div class="song__time">${song.time}</div>
                        
                </div>
            `
       })
        $('.playList').innerHTML = htmls.join('\n')

    },

    handleEvents: function() {
        const _this = this

        //xử lý quay dừng
        
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ],{
            duration: 10000,//10s
            iterations: Infinity
        })
        cdThumbAnimate.pause()


        //chạy nhạc
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause()           
            } else {
                audio.play()           
            }
        }

        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            played.classList.remove('playing')

            cdThumbAnimate.play()
        }

        audio.onpause = function() {
            _this.isPlaying = false
            played.classList.add('playing')
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // tiến độ bài hát chạy
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration*100)
                progress.value = progressPercent
            }
        }

        //tua
        progress.onchange = function(e){
            const seekTime = audio.duration/100*e.target.value
            audio.currentTime = seekTime
        }


        //next
        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }

        //prev
        prevBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }
        //random bài hát
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
           
        }
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

        console.log(heading, cdThumb, audio)
    },

    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },


    start: function() {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        this.handleEvents()

        //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //render playlist
        this.render()
    }

} 
app.start()