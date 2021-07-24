import React, { useState, useCallback } from "react";
import "./App.scss";
import Main from "./views/Main/main";
import AddUpdate from "./views/AddUpdate/AddUpdate";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";
import DataHandler from "./utils/DataHandler";

const App: React.FC = () => {
  const [auWindow, setAUWindow] = useState<string>('close');

  console.log('App.tsx');

  const windowHandler = useCallback((action, id?) => {
    switch (action) {
      case 'add':
        setAUWindow('open');
        break;
      case 'update':
        setAUWindow('open');
        break;
      case 'close':
        setAUWindow('close');
        break;
      default:
        Error('Undefined action!');
        break;
    }
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
            <DataHandler>
              <Main callback={windowHandler} />
              <AddUpdate className={auWindow} callback={windowHandler} />
            </DataHandler>
          </div>
        </div>
      </main>
    </div >
  );
};

export default App;
