var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

// var stages = {
//   0: {
//     message: 'Welcome to NEON MAZE!',
//     width: '4000px', // '2000px',
//     height: '4000px', // windowHeight + 'px',
//     startColor: 'green',
//     start: {
//       x: 100,
//       y: 100,
//       scrollX: 0,
//       scrollY: 0
//     },
//     // TODO: stack bars.....
//     'bar1': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 500,
//       y: 100,
//     },
//     'bar2': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 500,
//       y: 300,
//     },
//     'bar3': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 500,
//       y: 500,
//     },
//     'bar4': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 500,
//       y: 700,
//     },
//     'bar5': {
//       type: 'bar',
//       color: 'green',
//       direction: 'vertical',
//       collidable: true,
//       x: 900,
//       y: 100,
//     },
//     'bar6': {
//       type: 'bar',
//       color: 'green',
//       direction: 'vertical',
//       collidable: true,
//       x: 900,
//       y: 300,
//     },
//     'bar7': {
//       type: 'bar',
//       color: 'red',
//       direction: 'vertical',
//       collidable: true,
//       x: 900,
//       y: 500,
//     },
//     'bar8': {
//       type: 'bar',
//       color: 'red',
//       direction: 'vertical',
//       collidable: true,
//       x: 900,
//       y: 700,
//     },
//     'bar9': {
//       type: 'bar',
//       color: 'green',
//       direction: 'vertical',
//       collidable: true,
//       x: 1300,
//       y: 100,
//     },
//     'bar10': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 1300,
//       y: 300,
//     },
//     'bar11': {
//       type: 'bar',
//       color: 'green',
//       direction: 'vertical',
//       collidable: true,
//       x: 1300,
//       y: 500,
//     },
//     'bar12': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 1300,
//       y: 700,
//     },
//     'changer1': {
//       type: 'color',
//       color: 'yellow',
//       collidable: false,
//       x: 300,
//       y: 500,
//     },
//     'changer2': {
//       type: 'color',
//       color: 'green',
//       collidable: false,
//       x: 700,
//       y: 500,
//     },
//     'changer3': {
//       type: 'color',
//       color: 'red',
//       collidable: false,
//       x: 1100,
//       y: 200,
//     },
//     'exit': {
//       type: 'exit',
//       collidable: false,
//       x: 1500,
//       y: windowHeight / 2 - 50, // height / 2 - exit box / 2
//     }
//   },
//   1: {
//     message: 'test stage',
//     width: '2000px',
//     height: '2000px',
//     startColor: 'green',
//     // 'start': {
//     //   x: 100,
//     //   y: 100,
//     //   scrollX: 0,
//     //   scrollY: 0
//     // },
//     'bar1': {
//       type: 'bar',
//       color: 'yellow',
//       direction: 'vertical',
//       collidable: true,
//       x: 500,
//       y: 100,
//     },
//     'bar2': {
//       type: 'bar',
//       color: 'red',
//       direction: 'horizontal',
//       collidable: true,
//       x: 600,
//       y: 300,
//     },
//     'bar3': {
//       type: 'bar',
//       color: 'green',
//       direction: 'horizontal',
//       collidable: true,
//       x: 500,
//       y: 100,
//     },
//     'bar4': {
//       type: 'bar',
//       color: 'blue',
//       direction: 'horizontal',
//       collidable: true,
//       x: 200,
//       y: 500,
//     },
//     'changer1': {
//       type: 'color',
//       color: 'yellow',
//       collidable: false,
//       x: 800,
//       y: 500,
//     },
//     'changer2': {
//       type: 'color',
//       color: 'green',
//       collidable: false,
//       x: 1000,
//       y: 200,
//     },
//     'exit': {
//       type: 'exit',
//       collidable: false,
//       x: 1000,
//       y: 400,
//     }
//   }
// };












var stages = [
  {
    message: 'Welcome to NEON MAZE!', // change pos of msg + multple msgs?
    width: '4000px', // '2000px',
    height: '4000px', // windowHeight + 'px',
    startColor: 'green',
    start: {
      x: 100,
      y: 100,
      scrollX: 0,
      scrollY: 0
    },
    exit: {
      x: 1500,
      y: windowHeight / 2 - 50, // height / 2 - exit box / 2
    },
    // TODO: stack bars.....
    bars: [ // default: collidable: true
      {
        color: 'yellow',
        direction: 'vertical',
        // collidable: true,
        count: 4,
        x: 500,
        y: 100,
      },
      {
        color: 'green',
        direction: 'vertical',
        count: 2,
        x: 900,
        y: 100,
      },
      {
        color: 'red',
        direction: 'vertical',
        count: 2,
        x: 900,
        y: 500,
      },
      {
        color: 'green',
        direction: 'vertical',
        x: 1300,
        y: 100,
      },
      {
        color: 'yellow',
        direction: 'vertical',
        x: 1300,
        y: 300,
      },
      {
        color: 'green',
        direction: 'vertical',
        x: 1300,
        y: 500,
      },
      {
        color: 'yellow',
        direction: 'vertical',
        x: 1300,
        y: 700,
      }
    ],
    changers: [ // default: collidable: false
      {
        // type: 'color',
        color: 'yellow',
        // collidable: false,
        x: 300,
        y: 500,
      },
      {
        color: 'green',
        x: 700,
        y: 500,
      },
      {
        color: 'red',
        x: 1100,
        y: 200,
      }
    ]
  },
  {
    message: 'test stage',
    width: '2000px',
    height: '2000px',
    startColor: 'green',
    // 'start': {
    //   x: 100,
    //   y: 100,
    //   scrollX: 0,
    //   scrollY: 0
    // },
    bars: [
      {
        color: 'yellow',
        direction: 'vertical',
        // collidable: true,
        x: 500,
        y: 100,
      },
      {color: 'red', direction: 'horizontal', x: 600, y: 300},
      {color: 'green', direction: 'horizontal', x: 500, y: 100},
      {color: 'blue', direction: 'horizontal', x: 200, y: 500}
    ],
    changes: [
      {
        color: 'yellow',
        // collidable: false,
        x: 800,
        y: 500,
      },
      {
        color: 'green',
        x: 1000,
        y: 200,
      }
    ],
    exit: {x: 1000, y: 400}
  }
];

















var colors = {
  gray: '#676767',
  yellow: '#ffff00',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff'
};

var neon = {
  id: 0,
  width: 22,
  height: 22,
  x: 0, // $('#neonBoard').width() * 4 / 5,
  y: 0, // $('#neonBoard').height() * 4 / 5,
  angle: Math.PI * 3 / 2,
  element: $.parseHTML('<div id="neon"></div>') // class="neonSegment"
};
// console.log(neon);


var bar = {
  width: '200px',
  height: '10px'
};

// WIP:
// pause menu
// localstorage / main menu...
// stop neon = ctrl
// reset position btn(ctrl+...) just in case
// first stage go slowly
// todo goal stop fade next stage...
// health.... (when colliding..)
// .noselect

// collision
// can go through with the ctrl speed
// cant scroll left
// only scroll if neon is in the half
// fix reset

// FIX:
// scrolling...
// having inspector open bugs the screen...
// test with fullscreen / changing...

// TODO:
// sound effects
// music
// levels
// different shapes
// menu screen
// favicon
// https://www.youtube.com/watch?v=QkO5UBJ3Jm4

// MAIN WORKS:
// - start
// - finish
// - collision