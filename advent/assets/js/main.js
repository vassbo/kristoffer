var year = Object.keys(advent)[Object.keys(advent).length - 1]

// set select years
let html = []
Object.keys(advent).forEach((year) => html.push(`<option value="${year}">${year}</option>`))
document.querySelector("select").innerHTML = html.reverse().join("")

// change year
document.querySelector("select").addEventListener("change", (e) => {
    year = Number(e.target.value)
    createDoors()
    getStored()
    checkSunday()
    unlockDoors()
})

// create doors
createDoors()
function createDoors() {
    let html = "",
        html2 = ""
    for (let i = 0; i < 24; i++) {
        html += '<div class="door locked">' + (i + 1) + "</div>"
        html2 += '<div class="door locked"></div>'
    }
    document.getElementById("doors").innerHTML = html
    document.getElementById("doorsClone").innerHTML = html2
}

// get local storage
var opened = []
getStored()
function getStored() {
    opened = []
    if (typeof Storage !== "undefined" && localStorage["advent" + year] !== undefined) opened = JSON.parse(localStorage["advent" + year])
    // get opened doors!!!!!!!!!!
}

// check sunday
checkSunday()
function checkSunday() {
    var now = new Date()
    if (now >= new Date("12.1." + year) && now < new Date("12.24." + year)) {
        if (now.getDay() == 7) document.body.style.backgroundColor = "#41005b"
    } else document.body.style.backgroundColor = null
}

// unlock doors (timed & stored)
unlockDoors()
function unlockDoors() {
    let doors = document.getElementById("doors").querySelectorAll(".door")
    let doorsClone = document.getElementById("doorsClone").querySelectorAll(".door")
    for (let i = 0; i < doors.length; i++) {
        let now = new Date()
        let doorDate = new Date("12." + (i + 1) + "." + year)
        if (doorDate < now || openAllDoors) {
            doors[i].classList.remove("locked")
            doors[i].setAttribute("tabindex", "1")
            doorsClone[i].classList.remove("locked")
            doors[i].addEventListener("click", function () {
                openDoor(i)
            })
        } else doors[i].removeAttribute("tabindex")
    }
    for (let i = 0; i < opened.length; i++) {
        doors[opened[i]].classList.add("opened")
    }
}

// refresh date
setInterval(unlockDoors, 60000) // every minute

// esc
document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && esc) back()
})
document.getElementById("back").addEventListener("click", () => history.back())
function back() {
    clearTimeout(timeout)
    if (player !== undefined) player.pauseVideo()
    document.getElementById("day").classList.add("hidden")
    document.getElementById("back").classList.add("hidden")
    document.querySelector(".year").classList.remove("hidden")
    document.getElementById("doors").classList.remove("hidden")
    document.getElementById("doorsClone").classList.remove("hidden")
    document.querySelector(".candles").classList.add("hidden")
    // if (window.location.search) window.location.replace(window.location.origin)
}

// go back
window.addEventListener("popstate", back, false)

// remove search from url
// if (window.location.search) window.location.replace(window.location.origin)

document
    .getElementById("day")
    .querySelector(".verse")
    .addEventListener("click", function () {
        if (txt !== undefined && i < txt.length) {
            document.getElementById("day").querySelector(".verse").innerHTML = txt
            i = txt.length
        }
    })

var i = 0,
    txt,
    timeout
function verseType() {
    clearTimeout(timeout)
    if (i < txt.length) {
        document.getElementById("day").querySelector(".verse").innerHTML += txt.charAt(i)
        i++
        if (document.getElementById("day").querySelector(".verse").innerHTML.includes("—")) timeout = setTimeout(verseType, 100)
        else timeout = setTimeout(verseType, randomSpeed(txt.charAt(i - 1)))
    }
}

const slower = [".", "!", "?", ":", ";", "-", "–", "«", "»", "‘", "’"]
function randomSpeed(char) {
    let speed = Math.floor(Math.random() * 70) + 30 // 30-100
    if (slower.includes(char)) {
        speed = Math.floor(Math.random() * 500) + 900 // 900-1400
    } else if (char === ",") {
        speed = Math.floor(Math.random() * 200) + 400 // 400-600
    } else if (char === " ") {
        speed = Math.floor(Math.random() * 50) + 50 // 50-100
    }
    return speed
}
