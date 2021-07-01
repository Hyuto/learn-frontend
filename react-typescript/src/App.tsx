import SpinningLogo from './components/SpinningLogo/SpinningLogo';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <SpinningLogo />
      </header>
      <main>
        <div className="box"></div>        
      </main>
    </div>
  )
}

export default App;
