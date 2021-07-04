import React, { useState, useEffect } from "react";
import "./App.scss";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";
import axios, { AxiosInstance, AxiosResponse } from "axios";

interface ToDos {
  id: number;
  title: string;
  description: string;
  complete: boolean;
  deadline: string | null;
}

const server_data: AxiosInstance = axios.create({
  baseURL: "https://django-todos-application.herokuapp.com/api/",
});

const App: React.FC = () => {
  const [data, setData] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    server_data.get(".").then((response: AxiosResponse<ToDos[]>) => {
      const todos: JSX.Element[] = [];
      response.data.forEach((element) => {
        todos.push(<li key={element.id}>{element.title}</li>);
      });

      setData(todos);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <SpinningLogo />
      </header>
      <main>
        <div className={`box ${loading}`}>
          <h2>To Dos</h2>
          <ul className="todos-container">{data}</ul>
        </div>
      </main>
    </div>
  );
};

export default App;
