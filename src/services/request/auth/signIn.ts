import { useMutation } from "react-query";
import { ServerResponse } from "@/types/api";
import { SignInPayload } from "@/types/auth";
import { baseQuery } from "../baseQuery";

export const useSignInMutation = () => {
    return useMutation<ServerResponse<unknown>, Error, SignInPayload>((data) =>
      baseQuery({
        url: "/auth/login",
        method: "POST",
        data,
      })
    );
};