import React, { useState, useEffect } from "react";
import "./App.scss";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";
import List from "./components/List/List";
import { Instance } from "./utils/tools";
const App: React.FC = () => {
  const [todo, setTodo] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Instance.get(".").then((response) => {
      const data: JSX.Element = <List data={response.data} />;

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
            <div className="form">
            </div>
            {todo}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
