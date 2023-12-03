var id,
    timeout2,
    escapeTimeout,
    esc = true
function openDoor(day) {
    history.pushState({ luke: day + 1 }, "Luke " + (day + 1), null)

    let now = new Date()
    let doorDate = new Date(`${year}-12-${("0" + (day + 1)).slice(-2)}`)
    if ((doorDate < now && esc) || openAllDoors) {
        esc = false
        clearTimeout(escapeTimeout)
        escapeTimeout = setTimeout(() => {
            esc = true
        }, 1000)

        // document.querySelector('.doorNum').innerHTML = day;
        // document.getElementById('pass').querySelector('.hint').innerHTML = doorPass[day].hint;
        // document.getElementById('pass').classList.remove('hidden');

        if (!openAllDoors && !document.getElementById("doors").querySelectorAll(".door")[day].classList.contains("opened")) {
            document.getElementById("doors").querySelectorAll(".door")[day].classList.add("opened")
            opened.push(day)
            if (typeof Storage !== "undefined") localStorage["advent" + year] = JSON.stringify(opened)
        }

        document.querySelector(".year").classList.add("hidden")
        document.getElementById("doors").classList.add("hidden")
        document.getElementById("doorsClone").classList.add("hidden")
        // document.getElementById('pass').classList.add('hidden');
        // document.getElementById('day').querySelector('iframe').src = advent[year][day].song;

        id = advent[year][day].song
        start = 0
        stop = null

        document.querySelector(".jul").classList.add("hidden")
        if (advent[year][day].title.includes("advent")) {
            document.getElementById("day").querySelector(".verse").innerHTML = ""
            document.querySelector(".candles").classList.remove("hidden")
            let html = ""
            for (let i = 0; i < Number(advent[year][day].title.charAt(0)); i++) {
                html += `
                <div class="candle" onclick="this.classList.add('blink')">
                    <div class="flame">
                        <div class="shadows"></div>
                        <div class="top"></div>
                        <div class="middle"></div>
                        <div class="bottom"></div>
                    </div>
                    <div class="wick"></div>
                    <div class="wax"></div>
                </div>`
            }
            document.querySelector(".candles").innerHTML = html

            var candleCount = 0,
                interval
            interval = setInterval(() => {
                let candles = document.querySelectorAll(".candle")
                if (candleCount < candles.length) {
                    candles[candleCount].classList.add("blink")
                    candleCount++
                } else clearInterval(interval)
            }, 38000) // every 35 seconds
        } else if (advent[year][day].title.includes("GOD JUL!")) {
            document.getElementById("day").querySelector(".verse").innerHTML = ""
            document.querySelector(".jul").classList.remove("hidden")
        } else {
            // txt = advent[year][day].verse[0] + ' (' + advent[year][day].verse[1] + ')';
            // if (document.getElementById('day').querySelector('.verse').innerHTML !== txt) {
            if (player === undefined || (player.getVideoData() !== undefined && player.getVideoData().video_id !== id)) {
                i = 0
                txt = ""
                if (advent[year][day].verse) txt = advent[year][day].verse[0] + " — " + advent[year][day].verse[1] + ""
                document.getElementById("day").querySelector(".verse").innerHTML = ""
                clearTimeout(timeout2)
                clearTimeout(timeout)
                timeout2 = setTimeout(() => {
                    verseType()
                }, 3000)
            } else if (player.getVideoData() !== undefined && player.getVideoData().video_id === id) verseType()
        }

        document.getElementById("back").classList.remove("hidden")
        document.getElementById("day").classList.remove("hidden")
        if (advent[year][day].start !== undefined) start = advent[year][day].start
        if (advent[year][day].stop !== undefined) stop = advent[year][day].stop
        if (advent[year][day].captions !== undefined) captions = true
        else captions = false
        if (tag === undefined) createEmbed()
        else if (player.getVideoData() === undefined || player.getVideoData().video_id !== id) player.loadVideoById(id)
        else player.playVideo()
    } // else console.log('Bra forsøk!');
}

// YouTube embed

var tag
// setTimeout(() => {
//     if (tag == undefined) createEmbed();
// }, 1000);
function createEmbed() {
    // 2. This code loads the IFrame Player API code asynchronously.
    tag = document.createElement("script")

    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player,
    start,
    stop = null,
    captions = false
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "450", // 315
        width: "800", // 560
        // 800 * 0,5625 = 450
        videoId: id,
        playerVars: {
            autoplay: 1,
            start: start,
        },
        events: {
            // 'onReady': onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    })
}

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//     event.target.playVideo();
// }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false,
    stopPlayTimer,
    volumeTimer
function onPlayerStateChange(event) {
    var time, rate, remainingTime
    clearTimeout(stopPlayTimer)
    clearTimeout(volumeTimer)
    clearInterval(volumeInterval)
    player.setVolume(100)
    document.getElementById("player").removeAttribute("title")
    if (captions && event.data == YT.PlayerState.PLAYING) {
        player.loadModule("captions") //Works for html5 ignored by AS3
        // player.loadModule("cc");  //Works for AS3 ignored by html5
        player.setOption("captions", "track", { languageCode: "en" })
    } else if (event.data == YT.PlayerState.PLAYING) player.unloadModule("captions")
    if (stop !== null && event.data == YT.PlayerState.PLAYING) {
        time = player.getCurrentTime()
        // Add .4 of a second to the time in case it's close to the current time
        // (The API kept returning ~9.7 when hitting play after stopping at 10s)
        if (time + 0.4 < stop) {
            rate = player.getPlaybackRate()
            remainingTime = (stop - time) / rate
            stopPlayTimer = setTimeout(pauseVideo, remainingTime * 1000)
            if (remainingTime - 9 > 0) volumeTimer = setTimeout(fadeVolume, (remainingTime - 10) * 1000)
            else fadeVolume()
        } else {
            // player.pauseVideo();
            player.seekTo(0)
        }
    }

    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
    if (event.data == YT.PlayerState.ENDED) {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
            document.exitFullscreen()
        }
    }
}
function pauseVideo() {
    player.pauseVideo()
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        document.exitFullscreen()
    }
}
var volumeInterval
function fadeVolume() {
    // fade out volume
    let volume = 100
    volumeInterval = setInterval(() => {
        if (volume == 0) {
            clearInterval(volumeInterval)
            player.setVolume(100)
        } else {
            volume--
            player.setVolume(volume)
        }
    }, 100)
}
