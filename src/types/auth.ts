export type AuthMode = "signin" | "signup";

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  location: string;
  email: string;
  password: string;
}