import { useMutation } from "react-query";
import { ServerResponse } from "@/types/api";
import { SignUpPayload } from "@/types/auth";
import { baseQuery } from "../baseQuery";

export const useSignUpMutation = () => {
    return useMutation<ServerResponse<unknown>, Error, SignUpPayload>((data) =>
      baseQuery({
        url: "/auth/register",
        method: "POST",
        data,
      })
    );
};