"use strict";
const DEFAULT_COLOR = [0, 0, 0];

class CColor {
  constructor(red, green, blue) {
    if(red && green && blue) {
      this.values = [red, green, blue];
    } else {
      this.values = Array.from(DEFAULT_COLOR);
    }
  }

  get red() {
    return this.values[0];
  }

  get green() {
    return this.values[1];
  }

  get blue() {
    return this.values[2];
  }

  get list() {
    return this.values.join(",");
  }
}

module.exports = CColor;
