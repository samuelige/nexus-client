import { SignInData, SignUpData } from "./validation";

export async function signIn(data: SignInData) {
  const { email, password } = data;
  console.log({email, password})
}

export async function signUp(data: SignUpData) {
  console.log({data})
}