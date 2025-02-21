export type SignupPayload = {
  email: string;
  first_name: string;
  password: string;
  username: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type PostCreatePayload = {
  content: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  media?: any;
  tags: string[];
};
