const p5scopeFuncs = [
  'preload',
  'setup',
  'draw',
  'mouseMoved',
  'mouseDragged',
  'mousePressed',
  'mouseReleased',
  'mouseClicked',
  'doubleClicked',
  'mouseWheel',
  'touchStarted',
  'touchMoved',
  'touchEnded'
]

const p5callFuncs = [
  'createCanvas',
  'createVector',
  'createGraphics',

  // Color.settings
  'background',
  'clear',
  'colorMode',
  'fill',
  'noFill',
  'noStroke',
  'stroke',

  // Structure
  'remove',
  'noLoop',
  'loop',
  'push',
  'pop',
  'redraw',

  // Shape.2d_primitives
  'arc',
  'ellipse',
  'line',
  'point',
  'quad',
  'rect',
  'triangle',

  'rotate',
  'scale',
  'translate'
]

const p5vars = [
  // Constants
  'HALF_PI',
  'PI',
  'QUARTER_PI',
  'TAU',
  'TWO_PI',

  'width',
  'height',
  'mouseX',
  'mouseY'
]

// list of function that is better to use js stdfunc rather than p5
const p5slowFuncs = [
  'millis',
  'random'
]

const p5exprs = [
  ...p5callFuncs,
  ...p5vars,
  ...p5slowFuncs
]

module.exports = {
  p5scopeFuncs,
  p5exprs,
  p5callFuncs,
  p5vars,
  p5slowFuncs
}
