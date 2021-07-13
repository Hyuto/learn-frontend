import React, { useState, useEffect, useCallback } from "react";
import "./App.scss";
import Main from "./views/Main/main";
import AddUpdate from "./views/AddUpdate/AddUpdate";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";
import { Instance } from "./utils/tools";

const App: React.FC = () => {
  const [data, setData] = useState<ToDos[] | null>(null);
  const [auWindow, setAUWindow] = useState<string>('close');

  const windowHandler = useCallback((action, new_data = null) => {
    switch (action) {
      case 'open':
        setAUWindow('open');
        break;
      case 'close':
        setAUWindow('close');
        break;
      case 'update-data':
        setData(new_data);
        break;
      default:
        Error('Undefined action!');
        break;
    }
  }, [])

  useEffect(() => {
    console.log("App.tsx");
    Instance.get('.').then(response => {
      setData(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <SpinningLogo />
      </header>
      <main>
        <div className="container">
          <div className="title">
            <h2>React To Do's App</h2>
          </div>
          <div className="todos">
            <Main data={data} callback={windowHandler} />
            <AddUpdate data={data} className={auWindow}
              callback={windowHandler} />
          </div>
        </div>
      </main>
    </div >
  );
};

export default App;
