import {
  ConflictError,
  ServerError,
  tryAgainError,
  UnauthorizedError,
  WrongEmailOrPasswordError,
} from "./errors";
import { SigninPayload, SignupPayload } from "./payloads";
import { API_URL } from "./utils";

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
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (response.status === 204) {
    return;
  }
  if (response.status === 400 || response.status === 500) {
    throw tryAgainError;
  }
  if (response.status === 401) {
    throw new WrongEmailOrPasswordError("Wrong email or password");
  }
  throw tryAgainError;
}

export async function signout() {
  const response = await fetch(`${API_URL}/v1/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
  if (response.status !== 204) {
    return tryAgainError;
  }
}

export async function authStatus() {
  const response = await fetch(`${API_URL}/v1/auth/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.status === 204;
}

export async function authMe() {
  const response = await fetch(`${API_URL}/v1/auth/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (response.status === 500) {
    throw new ServerError();
  }
  throw tryAgainError;
}
