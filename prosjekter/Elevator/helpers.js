function getCurrentElevatorFloor(elevatorId) {
    // get current position
    let elevatorElemTop = document.querySelector("#" + elevatorId).offsetTop

    let currentFloorIndex = floors.findIndex((_, index) => {
        let floorElem = document.querySelector("#floor_" + index)
        let elemBottom = floorElem.offsetTop + floorElem.clientHeight

        return elemBottom > elevatorElemTop
    })

    return currentFloorIndex.toString()
}
