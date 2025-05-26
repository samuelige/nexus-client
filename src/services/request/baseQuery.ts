import { axiosBaseQuery } from "@/services/interceptor/axiosBaseQuery";
import config from "@/config/config";

export const baseQuery = axiosBaseQuery({ baseUrl: config.API_URL! });