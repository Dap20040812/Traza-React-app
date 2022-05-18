import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Intro from './components/Intro';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Detail from './components/PubliDetail';
import PubliHome from './components/PubliHome';
import MakePubli from './components/MakePubli';
import Profile from './components/Profile';
import MyPubli from './components/MyPubli';
import App1 from './components/pruba';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyDetail from './components/MyPubliDetail';
import MyRequest from './components/MyRequest';
import Chat from './components/Chat';
import CurrentService from './components/CurrentService';
import AcceptRequest from './components/AcceptRequest';
import RejectRequest from './components/RejectRequest';
import Pay from './components/Pay';
import MyOrderInProgress from './components/MyOrderInProgress';


function App() {
  
  return (
    <div className="App">
      <Router>
      <Header/>
      <Switch>
        <Route path='/intro'>
          <Intro/>
        </Route>
        <Route path='/detail/:id'>
          <Detail/>
        </Route>
        <Route path='/mydetail/:id'>
          <MyDetail/>
        </Route>
        <Route path='/homepubli'>
          <PubliHome/>
        </Route>
        <Route path='/chat'>
          <Chat/>
        </Route>
        <Route path='/publi/make'>
          <MakePubli/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route path='/publimy'>
          <MyPubli/>
        </Route>
        <Route path='/myrequest'>
          <MyRequest/>
        </Route>
        <Route path='/inprogress'>
          <MyOrderInProgress/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/prueba'>
          <App1/>
        </Route>
        <Route path='/current/:id'>
          <CurrentService />
        </Route>
        <Route path='/accept/:id'>
          <AcceptRequest/>
        </Route>
        <Route path='/reject/:id'>
          <RejectRequest/>
        </Route>
        <Route path='/pay/:id/:id1'>
          <Pay  />
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
