let btns = document.getElementById('mainMenu').querySelectorAll('button');
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
        switch (this.innerHTML) {
            case 'Play':
                setTimeout(() => {
                    $('.mainMenu > button').first().text('Continue');
                }, 600);
            case 'Continue':
                toggleMenu();
                break;
            case 'Stages':
                
                break;
            case 'Settings':
                
                break;
        
            default:
                alert(this.innerHTML);
                break;
        }
    })
}

// TODO: esc

$('#pause').click(toggleMenu);
$('#reset').click(function() {
    // TODO: reset
    neon.x = stages[currentStage].start.x;
    neon.y = stages[currentStage].start.y;
    // positionneon();
    $(neon.element).css({ left: neon.x - neon.width / 2,
        top: neon.y - neon.height / 2 });
    // rotate(neon.element, neon.angle);
});

document.addEventListener('keydown', function(e) {
    if (e.key == "Escape" && $('.mainMenu > button').first().text() == 'Continue') toggleMenu();
});
function toggleMenu() {
    if ($('#mainMenu').hasClass('hidden')) { // show menu
        $('.blur, #mainMenu').removeClass('hidden');
        setTimeout(() => {
            $('.blur, #mainMenu').addClass('fadeIn');
        }, 10);
        $('#pause, #reset').addClass('fadeOut');
        
        setTimeout(() => {
            $('#pause, #reset').addClass('hidden');
            $('.blur, #mainMenu').removeClass('fadeOut fadeIn');
        }, 600);
    } else if (!$('#mainMenu').hasClass('fadeOut')) { // hide menu
        $('.blur, #mainMenu').addClass('fadeOut');
        $('#pause, #reset').removeClass('hidden');
        setTimeout(() => {
            $('#pause, #reset').addClass('fadeIn');
        }, 20);
        setTimeout(() => {
            $('.blur, #mainMenu').addClass('hidden');
            $('#pause, #reset').removeClass('fadeOut fadeIn');
        }, 600);
    }
}

var neonMaze = {
    stage: 0,
    // stats: TODO: timer......
};
if (typeof(Storage) !== "undefined") {
    if (localStorage.neonMaze !== undefined) {
        neonMaze = localStorage.neonMaze;
    }
} else {
    alert('Sorry! Your browser does not support Web Storage and you will not be able to save your progress! You should switch or upgrade a browser.');
}

if (neonMaze.stage > 0) {
    // load stage in bg
    document.getElementById('mainMenu').querySelector('button').innerHTML = 'Continue';
}

// generate stages menu