import { PostCreatePayload } from "./payloads";
import { API_URL } from "./utils";

export async function fetchCreatePost(payload: PostCreatePayload) {
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
