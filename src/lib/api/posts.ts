import { DefaultError, NotFoundError, tryAgainError } from "./errors";
import { PostCreatePayload } from "./payloads";
import {
  GetUserFeedResponseSchema,
  GetUserPostsResponseSchema,
} from "./responses";
import { API_URL } from "./utils";

const LIMIT = 1;

export async function fetchCreatePost(payload: PostCreatePayload) {
  console.log(payload);
  const formData = new FormData();
  formData.append("content", payload.content);

  if (payload.media && payload.media.length > 0) {
    formData.append("media", payload.media[0]);
  }

  payload.tags.forEach((tag) => {
    formData.append("tags", tag);
  });

  const response = await fetch(`${API_URL}/v1/post/`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  console.log(response);
}

export async function fetchUserPosts(username: string, cursor?: string) {
  const url = cursor
    ? `${API_URL}/v1/user/posts/${username}?limit=${LIMIT}&cursor=${cursor}`
    : `${API_URL}/v1/user/posts/${username}?limit=${LIMIT}`;
  const response = await fetch(url);

  if (response.status === 400 || response.status === 500) {
    throw tryAgainError;
  }
  if (response.status === 404) {
    throw new NotFoundError();
  }
  if (response.status === 200) {
    const data = await response.json();
    const parsed = GetUserPostsResponseSchema.safeParse(data.data);
    if (!parsed.success) {
      console.log(parsed.error);
      throw new DefaultError("fail parsing response");
    }
    return parsed.data;
  }
  throw tryAgainError;
}

export async function fetchUserFeed(cursor?: string) {
  const url = cursor
    ? `${API_URL}/v1/user/feed?limit=${LIMIT}&cursor=${cursor}`
    : `${API_URL}/v1/user/feed?limit=${LIMIT}`;
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (
    response.status === 400 ||
    response.status === 500 ||
    response.status === 403
  ) {
    throw tryAgainError;
  }
  if (response.status === 200) {
    const data = await response.json();
    const parsed = GetUserFeedResponseSchema.safeParse(data.data);
    if (!parsed.success) {
      console.log(parsed.error);
      throw new DefaultError("fail parsing response");
    }
    return parsed.data;
  }
  throw tryAgainError;
}
