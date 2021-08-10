import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface Token {
  access: string;
  refresh: string;
}

interface Payload {
  token_type: string;
  exp: number;
  jti: string;
  user_id: string;
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
  token: Token;
  Instance: AxiosInstance;

  constructor() {
    const cookies = JSON.parse(Cookies.get("react-todos") as string);

    if (cookies) {
      this.verifyToken(cookies);
    } else {
      this.token = this.login();
    }

    this.Instance = this.getInstance();
  }

  parseJwt = (token: string): Payload => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  getInstance = (): AxiosInstance => {
    return axios.create({
      baseURL: URL + this.endpoint["api"],
      headers: { Authorization: `Bearer ${this.token["access"]}` },
    });
  };

  refresh = (token: Token) => {};

  login = (): Token => {
    const token: Token = None;

    Cookies.set("react-todos", JSON.stringify(token));

    return token;
  };

  verifyToken = (token: Token) => {
    const decoded_refresh = this.parseJwt(token["refresh"]);
    const decoded_access = this.parseJwt(token["access"]);
    if ((decoded_refresh.exp as number) < Math.floor(Date.now() / 1000)) {
      console.log("login");
    } else if ((decoded_access.exp as number) < Math.floor(Date.now() / 1000)) {
      console.log("refresh");
    } else {
      return token;
    }
  };
}

export const APIHandler: API = new API();

export const Instance = APIHandler.Instance;
