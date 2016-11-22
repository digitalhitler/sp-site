"use strict";

class APIResponse {
  constructor(val, options) {
    if(val instanceof Error || (val && val.hasOwnProperty("isError") && val.isError === true)) {
      this.error = true;
      this.errorDescription = val.description || "";
      this.errorObject = val;
    } else {
      this.error = false;
      this.data = val;
    }
  }

  toJSON() {
    let result = {};
    if(this.success) {
      result.success = true;
      result.data = this.data;
    } else {
      result.success = false;
      result.error = {};
      if(this.error.object) {
        result.errorDetails = this.errorObject.toString();
      }
    }

    return result;
  }

  get success() {
    return !this.error;
  }
}

module.exports = APIResponse;
