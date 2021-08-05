import axios, { AxiosInstance } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

interface Token {
  access: string;
  refresh: string;
}

const URL: string =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/"
    : "https://django-todos-application.herokuapp.com/";

class API {
  endpoint = {
    api: "api/",
    login: "auth/login/",
    refresh: "auth/login/refresh/",
    logout: "auth/logout/",
  };
  token?: Token;
  Instance: AxiosInstance;

  constructor() {
    const cookies = Cookies.get("react-todos");
    this.verifyToken();

    if (cookies) {
    }

    this.Instance = this.getInstance();
  }

  getInstance = (): AxiosInstance => {
    return axios.create({
      baseURL: URL + this.endpoint["api"],
      headers: { Authorization: "Bearer " },
    });
  };

  verifyToken = () => {
    const decoded = jwtDecode<JwtPayload>(
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4MTgyMTI2LCJqdGkiOiI0NTQ0NDdjZDE1NjA0MjI5ODFlZTVlMjQ0ODUwNzNiZiIsInVzZXJfaWQiOiI5NjIyNjZkYi00YzE2LTQwZWQtYjQxOC1lNjU3Njc1ZjA0NWIifQ.KlsvZHR8Pqsq6vg-KhquugbR3hSf4T2xzd85a2DI-BA"
    );
    console.log(decoded);
  };
}

export const APIHandler: API = new API();
