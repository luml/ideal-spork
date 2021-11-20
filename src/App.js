import './App.less';
import Home from './pages/Home'
import About from './pages/About'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Login from './pages/Login'
import Demo from './pages/Tree'
// import Comments from './pages/Comments'
import NotFoundPage from './pages/NotFoundPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './NavBar'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} exact />
            <Route path="/article-list" component={Articles} exact />
            <Route path="/article/:name" component={Article} exact />
            {/* <Route path="/comments/:name" component={Comments} exact /> */}
            <Route path="/login" component={Login} exact />
            <Route path="/tree" component={Demo} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
