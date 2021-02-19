///// PROJECTS /////

// sort projects by completeness
var projectsSorted = {}, tempArray = [];
for (var n in projects) tempArray.push([n, projects[n].completeness]);
tempArray.sort((b, a) => {return a[1] - b[1]});
tempArray.forEach(item => projectsSorted[item[0]] = projects[item[0]]);

loadProject(projects, document.getElementById('prosjekter').querySelector('.byCustom'));
loadProject(projectsSorted, document.getElementById('prosjekter').querySelector('.byProgress'));

// create projects list
function loadProject(object, elem) {
  var hiddenList = document.createElement('div');
  hiddenList.classList.add('hiddenList', 'hidden');
  let seperator = false;
  Object.keys(object).forEach(name => {
    let obj = object[name];
    let item = `<span onclick="openProject('${name}');" style="cursor: pointer;" tabindex="0">${name}</span>`;
    if (obj.url) item = `<a href="${obj.url}" target="_blank">${name}</a>`;

    var newDiv = `<span class="projectsItem"><h5>${item}</h5>
    <nav class="slider" title="${obj.completeness}% fullført" style="margin: 0;"><span class="base" style="width: 400px;"><span class="progressBar" style="width: ${obj.completeness}%;"></span></span></nav></span>`;

    if (name === 'SEPERATOR') {
      seperator = true;
      newDiv = '<span style="display: flex;justify-content: center;"><button onclick="showMore(this);" class="outline" style="width: 30%;margin: 10px 0;">Vis flere prosjekter</button></span>';
      elem.innerHTML += newDiv;
    } else if (seperator) hiddenList.innerHTML += newDiv;
    else elem.innerHTML += newDiv;
  });
  elem.appendChild(hiddenList);
}


// project buttons

function showMore(elem) {
  elem = elem.closest('div');
  elem.querySelector('.hiddenList').classList.toggle('hidden');
  elem.querySelector('button').classList.toggle('active');
}

function sortProjects(elem) {
  if (elem.classList.contains('active')) elem.title = 'Sorter etter fullført';
  else elem.title = 'Sorter etter relevans';
  elem.classList.toggle('active');
  document.getElementById('prosjekter').querySelector('.byCustom').classList.toggle('hidden');
  document.getElementById('prosjekter').querySelector('.byProgress').classList.toggle('hidden');
}

function openProject(name) {
  document.getElementById('projectPopup').classList.remove('hidden');
  document.getElementById('projectPopup').querySelector('h3').innerText = name;
  if (projects[name].description !== undefined) document.getElementById('projectPopup').querySelector('p').innerText = projects[name].description;
  document.getElementById('projectPopup').querySelector('iframe').src = 'prosjekter/' + name + '/index.html';
  document.getElementById('projectPopup').querySelector('iframe').focus();
  // create iframe
  // set name / description
}
function closePopup() {
  document.getElementById('projectPopup').classList.add('hidden');
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !document.getElementById('projectPopup').classList.contains('hidden')) document.getElementById('projectPopup').classList.add('hidden');
  else if (e.key === 'Enter' && e.target.getAttribute('tabindex') !== null) e.target.click();
})


///// MORE /////


// light mode
var r = document.querySelector(':root');
var theme = false;
var lightTheme = {
  background: '#eff6ff',
  text: 'black',
  'background-transparent': 'rgb(255 255 255 / 40%)',
  'transparent--5': 'rgb(0 0 0 / 5%)',
  'transparent--10': 'rgb(0 0 0 / 10%)',
  'transparent--20': 'rgb(0 0 0 / 20%)',
  'transparent--30': 'rgb(0 0 0 / 30%)'
}

function changeTheme() {
  theme = !theme;
  if (theme) Object.keys(lightTheme).forEach(key => r.style.setProperty('--' + key, lightTheme[key]));
  else document.documentElement.removeAttribute("style");
}