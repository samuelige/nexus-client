import { AxiosRequestConfig, AxiosError } from "axios";
import { axiosServer } from "./axios";

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }) =>
  async ({ url, method = "GET", data, params, headers }: AxiosBaseQueryArgs) => {
    try {
      let userToken: string | undefined;


      // const encryptedData = reduxStore.getState().persistedReducers.auth.authData;
      // if (encryptedData) {
      //   const { auth_token } = decryptedAuthData(encryptedData);
      //   userToken = auth_token;
      // }

      // let shouldEncrypt;

      // const excludeUrl = [] as any;

      // if (excludeUrl.includes(baseUrl + url)) {
      //   shouldEncrypt = false;
      // }

      const result = await axiosServer({
        url: baseUrl + url,
        method,
        // data: shouldEncrypt ? encryptPayload(JSON.stringify(data)) : data,
        data,
        params,
        headers: {
          ...headers,
          Authorization: `Bearer ${userToken || ""}`,
        },
      });

      return result.data;
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      throw err;
    }
  };