import { SignupPayload } from "./payloads";

export const API_URL = import.meta.env.VITE_API_URL as string;

export async function signup(payload: SignupPayload) {
  const response = await fetch(`${API_URL}/v1/auth/register/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.status === 400 || response.status === 500) {
    throw new DefaultError("An error occurred. Please try again");
  }
  const data = await response.json();
  if (response.status === 409) {
    throw new ConflictError(data.error);
  }
  return data;
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
    this.name = "ConflictError";
  }
}
