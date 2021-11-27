///// PROJECTS /////

// sort projects by completeness
var projectsSorted = {},
  tempArray = []
for (var n in projects) tempArray.push([n, projects[n].completeness])
tempArray.sort((b, a) => a[1] - b[1])
tempArray.forEach((item) => (projectsSorted[item[0]] = projects[item[0]]))

loadProject(projects, document.getElementById("prosjekter").querySelector(".byCustom"))
loadProject(projectsSorted, document.getElementById("prosjekter").querySelector(".byProgress"))

// create projects list
function loadProject(object, elem) {
  var hiddenList = document.createElement("div")
  hiddenList.classList.add("hiddenList", "hidden")
  let seperator = false
  Object.keys(object).forEach((name) => {
    let obj = object[name]
    let item = `<span onclick="openProject('${name}');" style="cursor: pointer;" tabindex="0">${name}</span>`
    if (obj.url)
      item = `<a style="display: flex;align-items: center;" href="${obj.url}" target="_blank" rel="noopener">${name}<svg style="fill: white;padding: 0 5px;height: 1em;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg></a>`

    var newDiv = `<span class="projectsItem" onclick="clickChild(this)"><p>${item}</p>
    <nav class="slider" title="${obj.completeness}% fullført" style="margin: 0;"><span class="base"><span class="progressBar" style="width: ${obj.completeness}%;"></span></span></nav></span>`

    if (name === "SEPERATOR") {
      seperator = true
      newDiv =
        '<span style="display: flex;justify-content: center;"><button onclick="showMore(this);" class="outline" style="width: 30%;margin: 10px 0;">Vis flere prosjekter</button></span>'
      elem.innerHTML += newDiv
    } else if (seperator) hiddenList.innerHTML += newDiv
    else elem.innerHTML += newDiv
  })
  elem.appendChild(hiddenList)
}

// project buttons

function showMore(elem) {
  elem = elem.closest("div")
  elem.querySelector(".hiddenList").classList.toggle("hidden")
  elem.querySelector("button").classList.toggle("active")
}

function sortProjects(elem) {
  if (elem.classList.contains("active")) elem.title = "Sorter etter fullført"
  else elem.title = "Sorter etter relevans"
  elem.classList.toggle("active")
  document.getElementById("prosjekter").querySelector(".byCustom").classList.toggle("hidden")
  document.getElementById("prosjekter").querySelector(".byProgress").classList.toggle("hidden")
}

function clickChild(e) {
  e.querySelector("p").children[0].click()
}
function openProject(name) {
  document.getElementById("projectPopup").classList.remove("hidden")
  document.getElementById("projectPopup").querySelector("h3").innerText = name
  document.getElementById("projectPopup").querySelector("p").innerText = projects[name].description || ""
  document.getElementById("projectPopup").querySelector("iframe").src = "prosjekter/" + name + "/index.html"
  document.getElementById("projectPopup").querySelector("iframe").focus()
}
function closePopup() {
  document.getElementById("projectPopup").classList.add("hidden")
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !document.getElementById("projectPopup").classList.contains("hidden")) document.getElementById("projectPopup").classList.add("hidden")
  else if (e.key === "Enter" && e.target.getAttribute("tabindex") !== null) e.target.click()
})

///// MORE /////

// light mode
var r = document.querySelector(":root")
var theme = false
var lightTheme = {
  background: "#eff6ff",
  text: "black",
  "background-transparent": "rgb(255 255 255 / 40%)",
  "transparent--5": "rgb(0 0 0 / 5%)",
  "transparent--10": "rgb(0 0 0 / 10%)",
  "transparent--20": "rgb(0 0 0 / 20%)",
  "transparent--30": "rgb(0 0 0 / 30%)",
}

function changeTheme() {
  theme = !theme
  if (theme) Object.keys(lightTheme).forEach((key) => r.style.setProperty("--" + key, lightTheme[key]))
  else document.documentElement.removeAttribute("style")
}
