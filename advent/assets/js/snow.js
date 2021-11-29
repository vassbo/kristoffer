// https://reactgo.com/css-snow-animation/

const flake = document.querySelector(".snowflake")
const container = document.querySelector(".snow-container")

function createFlake() {
  // cloning the flake node
  const clone = flake.cloneNode(true)

  // creating left padding
  clone.style.left = Math.random() * 99 + "%"

  // animation duration between 3-5
  clone.style.animationDuration = Math.random() * 5 + 8 + "s" // 3
  clone.style.opacity = Math.random() * 1
  container.append(clone) // adding clone flake to container
}

// to create more flakes decrease 100
const s = setInterval(createFlake, 100)

setTimeout(() => {
  clearInterval(s)
}, 10000) // flake creation stops after 3000 milliseconds or 3s
