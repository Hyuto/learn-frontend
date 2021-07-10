import axios, { AxiosInstance } from "axios";

const END_POINT: string =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/api/"
    : "https://django-todos-application.herokuapp.com/api/";

export const Instance: AxiosInstance = axios.create({
  baseURL: END_POINT,
});
