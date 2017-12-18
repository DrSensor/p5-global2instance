// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
var ext = {};

function setup () {
  createCanvas(width, 400);
  current = createVector(0, 0);
  previous = createVector(0, 0);
};

function draw () {
  background(200);

  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position      
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for (var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed () {
  next = 0;
  painting = true;
  ext.mouseX = mouseX;
  previous.x = mouseX;
  previous.y = mouseY;

  paths.push(new Path());
}

// Stop
function mouseReleased () {
  painting = false;
}
