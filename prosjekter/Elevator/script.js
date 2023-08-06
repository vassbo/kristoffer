const floors = [
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    "G", // ground
    "B", // basement (more common: S ?)
    "P", // parking
]

// WIP different "rest" floors: G, 9, 5, etc.

// WIP change this in real time
const elevators = 3

let elevatorData = []
const defaultData = {
    direction: "",
    goingTo: "",
    doorsOpened: false,
    innerQueue: [],
    alarm: false,
}

// const options = {
//     speedPerFloor: 0.2,
//     doorTime: 1,
//     closingCooldown: 0.5,
// }
const options = {
    speedPerFloor: 2,
    doorTime: 3,
    closingCooldown: 4,
}

var queue = [] // 0

;(function initialize() {
    generateFloors()
    createElevators()

    // set door timeout
    let doors = document.querySelectorAll(".elevator-door")
    doors.forEach((door) => {
        door.style.transition = options.doorTime + "s"
    })
})()

function generateFloors() {
    const upBtn = '<button class="button_up metal radial outside" onclick="callElevator(this, \'up\')">⬆</button>'
    const downBtn = '<button class="button_down metal radial outside" onclick="callElevator(this, \'down\')">⬇</button>'

    let floorElements = floors
        .map((floor, i) => {
            let buttons = ""
            if (i > 0) buttons += upBtn
            if (i < floors.length - 1) buttons += downBtn

            let html = `<div id="floor_${i}" class="floor">
            <span class="floorNum">${floor}</span>
            <span class="buttons">${buttons}</span>
            <span class="elevatorArea" id="area_${floor}"></span>
        </div>`
            // <span class="screen"><span class="screenFloor">G</span></span>

            return html
        })
        .join("")

    document.getElementById("floorsDiv").innerHTML += floorElements
}

function createElevators() {
    let area = document.querySelector("#area_G") || document.querySelector(".elevatorArea")
    let top = area.closest(".floor").offsetTop
    let left = area.offsetLeft
    let areaWidth = area.clientWidth
    const parts = areaWidth / (elevators + 1)

    let elevatorElements = [...Array(elevators).keys()]
        .map((i) => {
            elevatorData.push({ ...JSON.parse(JSON.stringify(defaultData)), id: `elevator_${i}` })

            return `<div id="elevator_${i}" class="elevator" style="left: ${left + parts * (i + 1)}px;top: ${top}px;">
                <div class="elevator-door elevator-door1"></div>
                <div class="elevator-door elevator-door2"></div>
                <div class="scene">
                    <div class="cube" onclick="openDoors(null, ${i})">
                    </div>
                </div>
            </div>`
        })
        .join("")

    document.getElementById("floorsDiv").innerHTML += elevatorElements
}

function getElevators() {
    return elevatorData.filter((a) => !a.alarm)
}

let waiting = { up: [], down: [] }
function callElevator(elem, direction) {
    let floorIndex = elem.closest(".floor").id.split("_")[1]
    if (waiting[direction].includes(floorIndex)) return

    let elevatorOnCurrentFloor = getElevators().find((a) => getCurrentElevatorFloor(a.id) === floorIndex)
    if (elevatorOnCurrentFloor) {
        openDoors(elevatorOnCurrentFloor)
        return
    }

    if (elem.classList.contains("active")) return

    elem.classList.add("active")
    waiting[direction].push(floorIndex)

    calculateMove()
}

function openDoors(data, index) {
    if (!data) data = elevatorData[index]
    if (data.alarm) return

    let elevator = document.querySelector("#" + data.id)
    let door1 = elevator.querySelector(".elevator-door1")
    let door2 = elevator.querySelector(".elevator-door2")

    door1.classList.add("opened")
    door2.classList.add("opened")
    data.doorsOpened = true

    if (data.doorsOpening) clearTimeout(data.doorsOpening)
    data.doorsOpening = setTimeout(() => {
        data.doorsOpening = null

        data.closingDoors = setTimeout(() => {
            closeDoors(data)
        }, options.closingCooldown * 1000)
    }, options.doorTime * 1000)
}

function closeDoors(data) {
    if (data.doorsOpening) return
    clearTimeout(data.closingDoors)

    let elevator = document.querySelector("#" + data.id)
    let door1 = elevator.querySelector(".elevator-door1")
    let door2 = elevator.querySelector(".elevator-door2")

    door1.classList.remove("opened")
    door2.classList.remove("opened")

    data.closingDoors = setTimeout(() => {
        data.doorsOpened = false

        data.goingTo = ""
        calculateMove()
    }, options.doorTime * 1000)
}

function calculateMove() {
    console.log("---- CALCULATE ----")
    let up = JSON.parse(JSON.stringify(waiting.up))
    let down = JSON.parse(JSON.stringify(waiting.down))

    let inUse = getElevators()
        .map((a) => a.goingTo)
        .filter((a) => a)

    let innerQueueUp = []
    let innerQueueDown = []

    // inner queue
    getElevators().forEach((data) => {
        if (!data.innerQueue?.length) return

        let queue = data.innerQueue
        if (data.direction === "down") {
            queue = queue.sort((a, b) => a - b)
            innerQueueDown.push(...queue)
        } else {
            queue = queue.sort((a, b) => b - a)
            innerQueueUp.push(...queue)
        }

        let elevatorFloor = getCurrentElevatorFloor(data.id)
        let closestFloorIndex = queue.findIndex((a) => (data.direction === "down" ? Number(a) >= Number(elevatorFloor) : Number(a) <= Number(elevatorFloor)))
        if (closestFloorIndex < 0) closestFloorIndex = 0

        let closestFloor = queue[closestFloorIndex]
        if (!data.direction) data.futureDirection = "up"
        data.goingTo = closestFloor
    })

    up = up.sort((a, b) => b - a).filter((a) => !inUse.includes(a) && !innerQueueUp.includes(a))
    down = down.sort((a, b) => a - b).filter((a) => !inUse.includes(a) && !innerQueueDown.includes(a))
    // console.log(inUse, up, down)

    let emptyElevator = getElevators().find((a) => a.goingTo === "" && !a.doorsOpened) // !a.direction &&
    let upElevator = getElevators().find((a) => a.direction === "up")
    let downElevator = getElevators().find((a) => a.direction === "down")
    // console.log(emptyElevator, upElevator, downElevator)

    let needsElevator = []

    if (up.length) {
        if (upElevator && !upElevator.doorsOpened) {
            let elevatorFloor = getCurrentElevatorFloor(upElevator.id)
            let closestFloorIndex = up.findIndex((a) => Number(a) <= Number(elevatorFloor))
            // console.log(closestFloorIndex, elevatorFloor)
            if (closestFloorIndex > -1) {
                let closestFloor = up[closestFloorIndex]
                upElevator.futureDirection = "up"
                upElevator.goingTo = closestFloor

                needsElevator = up.slice(0, closestFloorIndex)
            } else {
                needsElevator = up
            }
        } else if (emptyElevator && !emptyElevator.goingTo && (downElevator || !down.length)) {
            emptyElevator.futureDirection = "up"
            emptyElevator.goingTo = up[0]
        }

        if (needsElevator.length && emptyElevator && !emptyElevator.goingTo && (downElevator || !down.length)) {
            emptyElevator.futureDirection = "up"
            emptyElevator.goingTo = needsElevator[0]
        }
    }

    needsElevator = []

    if (down.length) {
        if (downElevator && !downElevator.doorsOpened) {
            let elevatorFloor = getCurrentElevatorFloor(downElevator.id)
            let closestFloorIndex = down.findIndex((a) => Number(a) >= Number(elevatorFloor))
            if (closestFloorIndex > -1) {
                let closestFloor = down[closestFloorIndex]
                downElevator.futureDirection = "down"
                downElevator.goingTo = closestFloor

                needsElevator = down.slice(0, closestFloorIndex)
            } else {
                needsElevator = down
            }
        } else if (emptyElevator && !emptyElevator.goingTo) {
            emptyElevator.futureDirection = "down"
            emptyElevator.goingTo = down[0]
        }

        if (needsElevator.length && emptyElevator && !emptyElevator.goingTo) {
            emptyElevator.futureDirection = "down"
            emptyElevator.goingTo = needsElevator[0]
        }
    }

    // move elevators
    getElevators().forEach(moveElevator)
}

function moveElevator(data, i) {
    if (data.goingTo === "") {
        data.direction = ""
        return
    }
    if (data.doorsOpened || data.alarm) return

    if (elevatorData[i].timeout) clearTimeout(elevatorData[i].timeout)

    let elevatorElem = document.querySelector("#" + data.id)
    let floorElem = document.querySelector("#floor_" + data.goingTo)
    let floorTop = floorElem.offsetTop

    // calculate time
    let elevatorFloor = getCurrentElevatorFloor(data.id)
    let floorDifference = Math.abs(data.goingTo - elevatorFloor)
    const secondsToArrive = floorDifference * options.speedPerFloor || 0.8

    elevatorElem.style.top = floorTop + "px"
    elevatorElem.style.transition = `top ${secondsToArrive}s`

    elevatorData[i].timeout = setTimeout(() => {
        console.log("ARRIVED AT FLOOR " + floors[data.goingTo])

        // set direction from futureDirection
        if (data.futureDirection) {
            data.direction = data.futureDirection
            delete data.futureDirection
        }

        // reset call button
        floorElem.querySelector(".button_" + data.direction).classList.remove("active")

        // remove from waiting
        let currentFloorIndex = waiting[data.direction].findIndex((a) => Number(a) === Number(data.goingTo))
        if (currentFloorIndex > -1) waiting[data.direction].splice(currentFloorIndex, 1)

        let innerIndex = data.innerQueue.indexOf(data.goingTo)
        if (innerIndex > -1) data.innerQueue.splice(innerIndex, 1)

        if (data.alarm) return

        openDoors(data), 100
    }, secondsToArrive * 1000 * 1.2)
}

// floor buttons
const selectedElevator = 0
function floor(floorIndex) {
    let data = elevatorData[selectedElevator]

    if (data.alarm || data.innerQueue.includes(floorIndex)) return

    data.innerQueue.push(floorIndex)

    calculateMove()
}

function openDoorsInside() {
    let data = elevatorData[selectedElevator]
    if (data.alarm) return

    openDoors(data)
}
function closeDoorsInside() {
    let data = elevatorData[selectedElevator]
    if (data.alarm) return

    closeDoors(data)
}

//////////////

// WIP update screens (don't work with multiple elevators)
function updateScreens(floor, direction) {
    floor = getFloorName(floor)
    var query = document.querySelectorAll(".screen")
    for (var i = 0; i < query.length; i++) {
        query[i].getElementsByClassName("screenFloor")[0].innerHTML = floor
        query[i].getElementsByClassName("screenDirection")[0].innerHTML = direction
    }
}

var alarm = false
function bell() {
    let data = elevatorData[selectedElevator]
    data.alarm = !data.alarm

    let bellElem = document.querySelector("#bell")
    if (data.alarm) bellElem.classList.add("active")
    else bellElem.classList.remove("active")

    // updateScreens('<span style="font-size:0.8em;filter:grayscale(80%);">⚠️</span>', null) // elevator.currentFloor

    // stop elevator!
}
