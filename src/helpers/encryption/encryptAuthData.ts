import { AuthState } from "../useAuthUser";

const CryptoJS = require("crypto-js");

export const encryptAuthData = (data: any) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.NEXT_PUBLIC_ENCRYPT_KEY,
  ).toString();
  return encrypted;
};

export const decryptedAuthData = (data: any) => {
  if (data) {
    const decrypted = CryptoJS.AES.decrypt(
      data,
      process.env.NEXT_PUBLIC_ENCRYPT_KEY,
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as AuthState;
  }
};
