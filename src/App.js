import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/login';
import Intro from './components/Intro';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Detail from './components/PubliDetail';


function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Switch>
        <Route path='/intro'>
          <Intro/>
        </Route>
        <Route path='/detail'>
          <Detail/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
