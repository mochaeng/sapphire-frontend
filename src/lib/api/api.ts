import { SigninPayload, SignupPayload } from "./payloads";

export const API_URL = import.meta.env.VITE_API_URL as string;

export async function signup(payload: SignupPayload) {
  const response = await fetch(`${API_URL}/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.status === 400 || response.status === 500) {
    throw tryAgainError;
  }
  const data = await response.json();
  if (response.status === 409) {
    throw new ConflictError(data.error);
  }
  if (response.status === 201) {
    return data;
  }
  throw tryAgainError;
}

export async function signin(payload: SigninPayload) {
  const response = await fetch(`${API_URL}/v1/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.status === 400 || response.status === 500) {
    throw tryAgainError;
  }
  if (response.status === 401) {
    throw new WrongEmailOrPassword("Wrong email or password");
  }
  if (response.status === 201) {
    const data = await response.json();
    return data;
  }
  throw tryAgainError;
}

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

export class WrongEmailOrPassword extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WrongEmailOrPassword";
  }
}

const tryAgainError = new DefaultError("An error occurred. Please try again");
