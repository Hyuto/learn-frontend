import React from "react";
import "./App.scss";
import Main from "./views/Main/main";
import SpinningLogo from "./components/SpinningLogo/SpinningLogo";

const App: React.FC = () => {
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
          <Main />
        </div>
      </main>
    </div>
  );
};

export default App;
