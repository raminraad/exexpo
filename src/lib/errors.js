export class baseError extends Error {
    constructor(code,message,inner) {
      super(message);
      this.code = code;
    }
  }
export class webError extends baseError {
    constructor(code,message,inner) {
      super(code,message,inner);
    }
  }
export class dbError extends baseError {
    constructor(code,message,inner) {
      super(code,message,inner);
    }
  }

export class authError extends baseError {
    constructor(code,message,inner) {
      super(code,message,inner);
    }
  }
export class appError extends baseError {
    constructor(code,message,inner) {
      super(code,message,inner);
    }
  }