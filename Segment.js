class Segment {
  constructor(param, length, angleRelativeToParent) {
    if (param['position']) {
      this.position = param['position'];
    } else if (param['parent']) {
      this.parent = param['parent'];
      this.position = this.parent.secondPos.copy();
    }
    if (param['child']) {
      this.child = param['child'];
    }
    if (param['segmentNumber']) {
      this.segmentNumber = param['segmentNumber'];
    } else {
      this.segmentNumber = 1;
    }
    this.angleRelativeToParent = angleRelativeToParent;
    this.angle = 0;
    this.length = length;
    this.secondPos = this.calculateSecondPos(this.position);
  }

  update() {
    this.angle = this.angleRelativeToParent;
    if (this.parent) {
      this.position = this.parent.secondPos.copy();
      this.angle += this.parent.angle;
    } else {
      this.angle += -PI/2
    }
    this.secondPos = this.calculateSecondPos(this.position);
  }

  show() {
    stroke(255);
    strokeWeight(this.length - 2*this.segmentNumber);

    line(this.position.x, this.position.y, this.secondPos.x, this.secondPos.y);
  }

  updateAngle(selfAngle) {
    this.angleRelativeToParent = selfAngle;
  }

  calculateSecondPos(initialPosition) {
    var changeX = this.length * cos(this.angle);
    var changeY = this.length * sin(this.angle);
    return createVector(initialPosition.x + changeX, initialPosition.y + changeY);
  }
}
