import React, { useState, useEffect } from "react";
import "./App.scss";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import Bar from "./components/Bar/Bar";

const END_POINT: string = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000/api/' : "https://django-todos-application.herokuapp.com/api/";

const server_data: AxiosInstance = axios.create({
  baseURL: END_POINT,
});

const App: React.FC = () => {
  const [todo, setTodo] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    server_data.get(".").then((response: AxiosResponse<ToDos[]>) => {
      const data: JSX.Element[] = response.data.map((element) => {
        return <Bar key={element.id} data={element} />
      })

      setTodo(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header center-vh">
        <SpinningLogo />
      </header>
      <main>
        <div className="container">
          <div className="title">
            <h2>React To Do's App</h2>
          </div>
          <div className={`todos ${loading}`}>
            {todo}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
