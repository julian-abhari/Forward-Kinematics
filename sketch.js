var tentacle;
var xOffset;
var angle = 0
function setup() {
	createCanvas(600, 600);
	xOffset = random(1000);
	tentacle = new Segment({"position": createVector(width/2, height)}, 30, angle);
	var currentSegment = tentacle;
	for (var i = 0; i < 10; i += 1) {
		var nextSegment = new Segment({"parent": currentSegment, "segmentNumber": i + 2}, 30, angle);
		currentSegment.child = nextSegment;
		currentSegment = nextSegment;
	}
}

function draw() {
	background(51);
	angle = map(noise(xOffset), 0, 1, PI / 4, -PI / 4);
	xOffset += 0.01

	var currentSegment = tentacle;
	while (currentSegment) {
		currentSegment.updateAngle(angle);
		currentSegment.update();
		currentSegment.show();
		currentSegment = currentSegment.child;
	}
}
