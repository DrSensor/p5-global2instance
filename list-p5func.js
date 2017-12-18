const p5scopeFuncs = [
  'preload',
  'setup',
  'draw',
  'windowResized',
  'mouseMoved',
  'mouseDragged',
  'mousePressed',
  'mouseReleased',
  'mouseClicked',
  'doubleClicked',
  'mouseWheel',
  'touchStarted',
  'touchMoved',
  'touchEnded',
  'keyPressed',
  'keyReleased',
  'keyTyped',
  'deviceMoved',
  'deviceTurned',
  'deviceShaken'
]

const p5callFuncs = [
  'createCanvas',
  'createGraphics',
  'resizeCanvas',
  'noCanvas',
  'blendMode',

  // Color.Settings
  'background',
  'clear',
  'colorMode',
  'fill',
  'noFill',
  'noStroke',
  'stroke',

  // Color.Creating_and_Reading
  'alpha',
  'blue',
  'brightness',
  'color',
  'green',
  'hue',
  'lerpColor',
  'lightness',
  'red',
  'saturation',

  // Structure
  'remove',
  'noLoop',
  'loop',
  'push',
  'pop',
  'redraw',

  // Shape.2D_Primitives
  'arc',
  'ellipse',
  'line',
  'point',
  'quad',
  'rect',
  'triangle',

  // Shape.3D_Models
  'loadModel',
  'model',

  // Shape.3D_Primitives
  'plane',
  'box',
  'sphere',
  'cylinder',
  'cone',
  'ellipsoid',
  'torus',

  // Shape.Attributes
  'ellipseMode',
  'noSmooth',
  'rectMode',
  'smooth',
  'strokeCap',
  'strokeJoin',
  'strokeWeight',

  // Shape.Curves
  'bezier',
  'bezierDetail',
  'bezierPoint',
  'bezierTangent',
  'curve',
  'curveDetail',
  'curveTightness',
  'curvePoint',
  'curveTangent',

  // Shape.Vertex
  'beginContour',
  'beginShape',
  'bezierVertex',
  'curveVertex',
  'endContour',
  'endShape',
  'quadraticVertex',
  'vertex',

  // Environment
  'print',
  'cursor',
  'frameRate',
  'noCursor',
  'fullscreen',
  'pixelDensity',
  'displayDensity',
  'getURL',
  'getURLPath',
  'getURLParams',

  // Transform
  'applyMatrix',
  'resetMatrix',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'shearX',
  'shearY',
  'translate',

  // Data.Array_Functions
  'append',
  'arrayCopy',
  'concat',
  'reverse',
  'shorten',
  'shuffle',
  'sort',
  'splice',
  'subset',

  // Data.Conversion
  'float',
  'int',
  'str',
  'boolean',
  'byte',
  'char',
  'unchar',
  'hex',
  'unhex',

  // Data.String_Functions
  'join',
  'match',
  'matchAll',
  'nf',
  'nfc',
  'nfp',
  'nfs',
  'split',
  'splitTokens',
  'trim',

  // Events
  'setMoveThreshold',
  'setShakeThreshold',
  'keyIsDown',

  // Image
  'createImage',
  'saveCanvas',
  'saveFrames',
  'loadImage',
  'image',
  'tint',
  'noTint',
  'imageMode',
  'blend',
  'copy',
  'filter',
  'get',
  'loadPixels',
  'set',
  'updatePixels',

  // IO
  'loadJSON',
  'loadStrings',
  'loadTable',
  'loadXML',
  'httpGet',
  'httpPost',
  'httpDo',
  'createWriter',
  'write',
  'print',
  'flush',
  'close',
  'save',
  'saveJSON',
  'saveStrings',
  'saveTable',
  'downloadFile',

  // Math
  'createVector',
  'constrain',
  'dist',
  'lerp',
  'mag',
  'map',
  'norm',
  'sq',
  'noise',
  'noiseDetail',
  'noiseSeed',
  'degrees',
  'radians',
  'angleMode',

  // Typography
  'textAlign',
  'textLeading',
  'textSize',
  'textStyle',
  'textWidth',
  'textAscent',
  'textDescent',
  'loadFont',
  'text',
  'textFont',

  // Lights_Camera
  'camera',
  'perspective',
  'ortho',
  'ambientLight',
  'directionalLight',
  'pointLight',
  'loadShader',
  'shader',
  'normalMaterial',
  'texture',
  'ambientMaterial',
  'specularMaterial'
]

const p5Instance = [
  'p5.Color',
  'p5.Element',
  'p5.Graphics',
  'p5.TypedDict',
  'p5.NumberDict',
  'p5.Table',
  'p5.TableRow',
  'p5.XML',
  'p5.Vector',
  'p5.Font',
  'p5.Shader',
  'p5.Texture',
  'p5.Geometry',
  'p5.Matrix',
  'p5.RendererGL'
]

const p5vars = [
  // Constants
  'HALF_PI',
  'PI',
  'QUARTER_PI',
  'TAU',
  'TWO_PI',

  // Environment
  'frameCount',
  'focused',
  'displayWidth',
  'displayHeight',
  'windowWidth',
  'windowHeight',
  'width',
  'height',

  // Events.Mobile
  'deviceOrientation',
  'accelerationX',
  'accelerationY',
  'accelerationZ',
  'pAccelerationX',
  'pAccelerationY',
  'pAccelerationZ',
  'rotationX',
  'rotationY',
  'rotationZ',
  'pRotationX',
  'pRotationY',
  'pRotationZ',
  'turnAxis',
  'touches',

  // Events.Desktop
  'keyIsPressed',
  'key',
  'keyCode',
  'mouseX',
  'mouseY',
  'pmouseX',
  'pmouseY',
  'winMouseX',
  'winMouseY',
  'pwinMouseX',
  'pwinMouseY',
  'mouseButton',
  'mouseIsPressed',

  'pixels'
]

// list of function that is better to use js stdfunc rather than p5
// the purpose I left it here is in case need for warning in enforce mode
const p5slowFuncs = [
  'day',
  'hour',
  'minute',
  'millis',
  'month',
  'second',
  'year',
  'randomSeed',
  'random',
  'randomGaussian'
]

// list of p5 function that overlap with browser std function
const stdFuncs = {
  'Math': [
    'abs',
    'ceil',
    'exp',
    'floor',
    'log',
    'max',
    'min',
    'pow',
    'round',
    'sqrt'
  ]
}

const p5funcs = [
  ...p5callFuncs,
  ...p5slowFuncs
]

const p5exprs = [
  ...p5callFuncs,
  ...p5vars,
  ...p5slowFuncs
]

module.exports = {
  p5scopeFuncs,
  p5callFuncs,
  p5funcs,
  p5exprs,
  p5vars,
  p5Instance,
  stdFuncs,
  p5slowFuncs
}
