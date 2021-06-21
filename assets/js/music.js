var audio, interval;
var queue = [], queuePos = 0;
var repeat = true, mousedown = false, mouseOnSlider = false, fullscreen = false;
let playerDiv = document.getElementById('musicPlayer');

function playTrack(name, card) {
  if (card === undefined || !card.classList.contains('playing')) {
    if (name === 'Move') alert('Advarsel! Ustemte vokaler'); //////////////////////

    if (fullscreen) document.getElementById('cover').src = './assets/covers/' + name + '.jpg';

    // set music player values
    playerDiv.classList.remove('hidden');
    document.querySelector('.musicPlayerHeight').classList.remove('hidden');
    playerDiv.querySelector('img').src = './assets/covers/resized/' + name + '.jpg'; // TODO: small image version
    playerDiv.querySelector('h4').innerText = name;
    playerDiv.querySelector('.play').innerHTML = 'pause';
    updateSlider(0);
    loader(true);

    // play button on cards
    let playingCard = document.getElementById('musikk').querySelector('.playing');
    if (playingCard !== null) {
      playingCard.classList.remove('playing');
      playingCard.querySelector('.material-icons').innerHTML = 'play_arrow';
    }
    if (card === undefined) {
      Object.keys(tracks).forEach((trackName, i) => {
        if (trackName === queue[queuePos]) {
          card = document.getElementById('musikk').querySelector('.tracks').querySelectorAll('div')[i].querySelector('span');
        }
      });
    }
    card.classList.add('playing');
    card.querySelector('.material-icons').innerHTML = 'pause';

    // queue
    if (!queue.length) generateQueue();
    queue.forEach((trackName, i) => {
      if (trackName === name) {
        queuePos = i;
      }
    });

    // new audio
    let src = './assets/music/' + name + '.mp3';
    if (audio === undefined) {
      audio = new Audio(src);
      audio.id = 'audio';
      audio.removeEventListener('ended', player.ended);
      audio.addEventListener('ended', player.ended);
      audio.addEventListener('canplaythrough', loader);
    } else audio.src = src;
    // audio.addEventListener('error', () => { console.error('Kunne ikke laste inn lydfil!'); loader(); });
    audio.play();
    mediaSession(name);

    // update time & progress bar
    interval = setInterval(function () {
      if (audio !== undefined) {
        if (playerDiv.querySelector('.duration').innerText !== getTime(audio.duration))
          playerDiv.querySelector('.duration').innerText = getTime(audio.duration);
        if (mouseOnSlider === false && playerDiv.querySelector('.play').innerHTML === 'pause') {
          playerDiv.querySelector('.progress').innerText = getTime(audio.currentTime);
          updateSlider(audio.currentTime / audio.duration * 100);
        }
      }
    }, 50);
  } else player.pause();
}



function playerActions() {
  // play & pause
  function pause() {
    if (!loading) {
      var play = playerDiv.querySelector('.play');
      let icon = 'pause';
      if (play.innerHTML === 'pause') {
        icon = 'play_arrow'
        audio.pause();
      } else audio.play();
  
      play.innerHTML = icon;
      document.getElementById('musikk').querySelector('.playing').querySelector('.material-icons').innerHTML = icon;
    }
  }

  function next() {
    if (!loading) playQueue(1);
  }
  function previous() {
    if (!loading) {
      if (audio.currentTime < 3) playQueue(-1);
      else {
        audio.currentTime = 0;
        if (audio.paused) player.pause();
      }
    }
  }

  function ended() {
    playQueue(1);
  
    // final track
    if (!repeat && queuePos + 1 >= queue.length) {
      playerDiv.querySelector('.play').innerHTML = 'play_arrow';
      document.getElementById('musikk').querySelector('.playing').querySelector('.material-icons').innerHTML = 'play_arrow';
    }
  }

  return {pause, next, previous, ended};
}
const player = playerActions();


function generateQueue() {
  queue = [];
  Object.keys(tracks).forEach(name => queue.push(name));
}
function playQueue(index) {
  let next = null;
  queuePos += index;
  if (queuePos < 0) {
    if (repeat) queuePos = queue.length - 1;
    else queuePos = 0;
  } else if (queuePos >= queue.length && repeat) queuePos = 0;

  if (queuePos >= queue.length) {
    audio.currentTime = audio.duration;
    updateSlider(audio.duration * 100);
    queuePos = queue.length - 1;
  } else playTrack(queue[queuePos]);
  
  return next;
}


function mediaSession(name) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: name,
      artist: 'Vizzber',
      album: tracks[name].album,
      artwork: [{src: '/assets/covers/' + name + '.jpg', sizes: '192x192', type: 'image/jpg'}]
    });
    navigator.mediaSession.setActionHandler('play', player.pause);
    navigator.mediaSession.setActionHandler('pause', player.pause);
    navigator.mediaSession.setActionHandler('seekbackward', () => audio.currentTime = audio.currentTime - 10);
    navigator.mediaSession.setActionHandler('seekforward', () => audio.currentTime = audio.currentTime + 10);
    navigator.mediaSession.setActionHandler('previoustrack', player.previous);
    navigator.mediaSession.setActionHandler('nexttrack', player.next);
  }
}


function getTime(time) {
  let minutes = '0' + Math.floor(time / 60);
  let seconds = '0' + (Math.floor(time) - minutes * 60);
  let dur = minutes.substr(-1) + ':' + seconds.substr(-2);
  if (isNaN(time)) dur = '0:00';
  return dur;
}

var loading = false;
function loader(start) {
  if (start === true && document.querySelector('.loader') === null) {
    loading = true;
    document.getElementById('musicPlayer').querySelector('h4').innerHTML += '<span class="loader"></span>';
  } else if (playerDiv.querySelector('.loader') !== null) {
    loading = false;
    playerDiv.querySelector('.loader').remove();
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
}

function showMoreMusic(elem) {
  elem.closest('div').remove();
  loadTracks(true);
}


function updateSlider(value) {
  let slider = document.getElementById('musicPlayer').querySelector('.timeInfo');
  slider.querySelector('.progressBar').style.width = value + '%';
  slider.querySelector('.handle').style.left = value + '%';
}

var currentTime = 0;
function moveSlider(e) {
  if (e.target.closest('.slider') !== null) {
    mouseOnSlider = true;
    let slider = playerDiv.querySelector('.base');
    let width = slider.offsetWidth;
    let left = e.clientX - slider.offsetLeft;
    let percentage = left / width;
  
    if (left > 0 && left < width) {
      updateSlider(percentage * 100);
    } else if (left < width) {
      updateSlider(0);
      percentage = 0;
    } else {
      updateSlider(100);
      percentage = 1;
    }
    currentTime = audio.duration * percentage;
    playerDiv.querySelector('.progress').innerText = getTime(currentTime);
  } else mouseOnSlider = false;
}


///// LISTENERS /////


playerDiv.querySelector('.slider').addEventListener('mousedown', (e) => { mousedown = true; moveSlider(e); });
document.addEventListener('mousemove', (e) => { if (mousedown) moveSlider(e); });
document.addEventListener('mouseup', () => {
  if (mouseOnSlider) {
    loader(true);
    audio.currentTime = currentTime;
    mouseOnSlider = false;
  }
  mousedown = false;
});


// music player buttons
let playerButtons = playerDiv.querySelectorAll('.material-icons');
playerButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let c = e.target.classList;
    if (c.contains('play') || c.contains('pause')) player.pause();
    else if (c.contains('next')) player.next();
    else if (c.contains('previous')) player.previous();
    else if (c.contains('repeat')) {
      if (repeat === true) {
        repeat = 'one';
        audio.loop = true;
        e.target.innerHTML = 'repeat_one';
      } else if (repeat === 'one') {
        repeat = false;
        audio.loop = false;
        c.remove('active');
        e.target.innerHTML = 'repeat';
      } else if (!repeat) {
        repeat = true;
        c.add('active');
      }
    } else if (c.contains('shuffle')) {
      c.toggle('active');
      let currentTrack = queue[queuePos];
      if (c.contains('active')) {
        queue.splice(queuePos, 1);
        shuffle(queue);
        queue.unshift(currentTrack);
        queuePos = 0;
      } else {
        generateQueue();
        queue.forEach((trackName, i) => {
          if (trackName === currentTrack) {
            queuePos = i;
          }
        });
      }
    } else if (c.contains('fullscreen')) toggleFullscreen();
  });
});


// fullscreen
var scrollY = 0;
function toggleFullscreen(escape) {
  if (fullscreen) {
    fullscreen = false;
    document.body.style.overflow = null;
    playerDiv.style.backgroundColor = null;
    playerDiv.style.backdropFilter = null;
    playerDiv.querySelector('.fullscreen').innerHTML = 'fullscreen';
    if (escape !== true) document.exitFullscreen();
    setTimeout(function () {
      document.documentElement.style.scrollBehavior = 'unset';
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
  } else {
    fullscreen = true;
    document.getElementById('cover').src = './assets/covers/' + playerDiv.querySelector('h4').innerText + '.jpg';
    document.body.style.overflow = 'hidden';
    playerDiv.style.backgroundColor = 'var(--background-transparent)';
    playerDiv.style.backdropFilter = 'blur(8px)';
    playerDiv.querySelector('.fullscreen').innerHTML = 'fullscreen_exit';
    scrollY = window.pageYOffset;
    setTimeout(function () {
      document.body.requestFullscreen();
    }, 10);
  }
  playerDiv.querySelector('img').classList.toggle('hidden');
  document.getElementById('cover').classList.toggle('hidden');
}

document.addEventListener('fullscreenchange', fullscreenExit, false);
function fullscreenExit() {
  let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
  if (fullscreenElement === null && fullscreen === true) {
    toggleFullscreen(true);
  }
}

// shortcuts
document.addEventListener('keydown', e => {
  if (audio !== undefined && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA' && pressed === false) {
    e.preventDefault();
    pressed = true;
    if (e.code === 'Space' || e.key === 'k') player.pause();
    else if (e.key === 'Escape') {
      playerDiv.classList.add('hidden');
      document.querySelector('.musicPlayerHeight').classList.add('hidden');
      clearInterval(interval);
      audio.pause();
      audio = undefined;
      // audio.remove();

      // reset mediasession
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
      }

      document.getElementById('musikk').querySelector('.playing').querySelector('.material-icons').innerHTML = 'play_arrow';
      document.getElementById('musikk').querySelector('.playing').classList.remove('playing');
    } else if (e.key === 'ArrowRight') audio.currentTime = audio.currentTime + 5;
    else if (e.key === 'ArrowLeft') audio.currentTime = audio.currentTime - 5;
    else if (e.key === 'l') audio.currentTime = audio.currentTime + 10;
    else if (e.key === 'j') audio.currentTime = audio.currentTime - 10;
    else if (e.key === 'm') audio.muted = !audio.muted;
    else if (e.key === 'f') toggleFullscreen();
  }
});
var pressed = false;
document.addEventListener('keyup', () => pressed = false);