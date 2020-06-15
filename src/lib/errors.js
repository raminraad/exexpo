export class baseError extends Error {
    constructor(code,message) {
      super(message);
      this.code = code;
    }
  }
export class webError extends baseError {
    constructor(code,message) {
      super(code,message);
    }
  }

export class authError extends baseError {
    constructor(code,message) {
      super(message);
    }
  }