import { DefaultError, ProfileNotFoundError, tryAgainError } from "./errors";
import {
  UserPostsResponseSchema,
  UserProfileResponseSchema,
} from "./responses";
import { API_URL } from "./utils";

export async function fetchUserPosts({
  username,
  signal,
}: {
  username: string | undefined;
  signal: AbortSignal;
}) {
  if (!username) {
    throw new DefaultError("username is not defined");
  }
  const response = await fetch(`${API_URL}/v1/user/posts/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });
  if (response.status === 200) {
    const data = await response.json();
    const parsed = UserPostsResponseSchema.safeParse(data.data);
    if (!parsed.success) {
      console.log(parsed.error);
      throw new DefaultError("fail parsing response");
    }
    return parsed.data;
  }
  if (response.status === 404) {
    throw new ProfileNotFoundError("Profile was not found");
  }
  throw tryAgainError;
}

export async function fetchUserProfile({
  username,
  signal,
}: {
  username: string | undefined;
  signal: AbortSignal;
}) {
  if (!username) {
    throw new DefaultError("username is not defined");
  }
  const response = await fetch(`${API_URL}/v1/user/profile/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });
  if (response.status === 201) {
    const data = await response.json();
    const parsed = UserProfileResponseSchema.safeParse(data.data);
    if (!parsed.success) {
      console.log(parsed.error);
      throw new DefaultError("fail parsing response");
    }
    return parsed.data;
  }
  if (response.status === 404) {
    throw new ProfileNotFoundError("Profile was not found");
  }
  throw tryAgainError;
}
