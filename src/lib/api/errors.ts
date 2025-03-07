export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "You are not authorized") {
    super(message);
    this.name = "DefaultError";
  }
}

export class ServerError extends Error {
  constructor(message: string = "A internal server error has happened") {
    super(message);
    this.name = "DefaultError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Nothing was found") {
    super(message);
    this.name = "NotFoundError";
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

export class ProfileNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProfileNotFound";
  }
}

export const tryAgainError = new DefaultError(
  "An error occurred. Please try again",
);
