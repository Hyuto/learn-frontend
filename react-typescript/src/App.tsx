import React, { useState, useCallback } from "react";
import "./App.scss";
import Main from "./views/Main/main";
import AddUpdate from "./views/AddUpdate/AddUpdate";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";
import DataHandler from "./utils/DataHandler";

interface WindowType {
  type: string;
  data?: ToDos;
}

const App: React.FC = () => {
  const [auWindow, setAUWindow] = useState<string>('close');
  const [typeWindow, settypeWindow] = useState<WindowType>({ type: 'Create' });

  console.log('App.tsx');

  const windowHandler = useCallback((action, data?) => {
    switch (action) {
      case 'add':
        settypeWindow({ type: 'Create' });
        setAUWindow('open');
        break;
      case 'update':
        settypeWindow({ type: 'Update', data: data });
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
          <DataHandler>
            <div className="todos">
              <Main callback={windowHandler} />
              <AddUpdate className={auWindow} callback={windowHandler}
                typeform={typeWindow} />
            </div>
          </DataHandler>
        </div>
      </main>
    </div >
  );
};

export default App;
