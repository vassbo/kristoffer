// random greeting
const titles = ["Velkommen!", "Hei.", "Heisann.", "Hallo.", "Halloen.", ":)", ":D"]

var h = new Date().getHours()
if (h < 10) titles.push("God morgen!")
else if (h < 18) titles.push("God dag!")
else titles.push("God kveld!")

document.querySelector(".top").querySelector("h1").innerHTML = titles[Math.floor(Math.random() * titles.length)]

// create track cards
;(function loadTracks() {
    let seperator = false
    for (let name of Object.keys(tracks)) {
        let track = tracks[name]
        let elem = document.createElement("div")
        if (seperator) elem.classList.add("hidden")

        if (name === "SEPERATOR") {
            seperator = true
            elem.innerHTML = `<span title='Vis flere' class="play" onclick="showMoreMusic(this);" tabindex="0"><span class="cover-preview"></span><span class="material-icons" style="opacity: 1;color: var(--primary);">more_horiz</span></span>`
        } else
            elem.innerHTML = `<span id="${name}" title='Spill av "${name}"' class="play" onclick="playTrack('${name}', this);" tabindex="0">
      <img src="./assets/covers/resized/${name}.jpg" alt="Cover for ${name}" class="cover-preview">
      <span class="material-icons">play_arrow</span><span class="info">${track.duration}</span>
    </span>
    <span><span>${checkName(name)}</span><p>${getDate(track.uploaded)}</p></span>`

        document.querySelector(".tracks").appendChild(elem)
    }
    delete tracks.SEPERATOR

    function checkName(name) {
        let remix = name.indexOf(" (Vizzber Remix)")
        if (remix > -1) name = name.slice(0, remix)
        return name
    }
    function getDate(date) {
        date = date.split("/")
        let month = ["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des."][Number(date[1]) - 1]
        return date[0] + ". " + month + " 20" + date[2]
    }
})()

// scroll -> header
const sections = document.querySelectorAll("section")
function changeLinkState() {
    let i = sections.length
    while (--i && window.pageYOffset + 50 < sections[i].offsetTop) {}

    document.querySelector("header").querySelector(".active").classList.remove("active")
    document.querySelector("header").querySelectorAll("a")[i].classList.add("active")
}
window.addEventListener("scroll", changeLinkState)

// collapsibles
document.getElementById("age").innerText = Math.abs(new Date(Date.now() - new Date("November 05, 2002 21:51:00").getTime()).getUTCFullYear() - 1970)
;[...document.getElementsByClassName("collapsible")].forEach((elem) => {
    elem.addEventListener("click", (e) => {
        e.target.classList.toggle("active")
        e.target.nextElementSibling.classList.toggle("hidden")
        document.activeElement.blur()
    })
})

// skills
let html = "<div class='skillsItem'>"
skills.forEach((skill, i) => {
    if (i > 0) html += ", "
    html += `${skill}`
})
html += "</div>"
document.getElementById("skills").innerHTML = html
