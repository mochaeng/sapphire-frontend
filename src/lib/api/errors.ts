export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class DefaultError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DefaultError";
  }
}

export class WrongEmailOrPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WrongEmailOrPassword";
  }
}

export const tryAgainError = new DefaultError(
  "An error occurred. Please try again",
);
