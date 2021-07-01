import SpinningLogo from './components/SpinningLogo/SpinningLogo';
import Data from './utils/getData';
import './App.scss';

const generate_todos = () => {
  const data: Promise<Array<Object>> = new Data('https://django-todos-application.herokuapp.com/api/').get();
  const todos: Array<JSX.Element> = [];
  
  data.then(e => {
    e.forEach(element => {
      todos.push(<h1>Hallo</h1>)
    })
  });
  
  return todos;
}

const App = () => {
  const todos = generate_todos();
  console.log(todos);

  return (
    <div className="App">
      <header className="App-header">
        <SpinningLogo />
      </header>
      <main>
        <div className="box">
                 
        </div>        
      </main>
    </div>
  )
}

export default App;
