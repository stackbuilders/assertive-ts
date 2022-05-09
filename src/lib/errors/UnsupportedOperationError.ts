export class UnsupportedOperationError extends Error {

  public constructor(message?: string) {
    super(`Unsupported operation. ${message}`);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
