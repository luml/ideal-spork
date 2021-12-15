import './App.less';
import Home from './pages/Home'
import About from './pages/About'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Login from './pages/Login'
import TreePage from './pages/TreePage'
import Comments from './pages/Comments'
import NotFoundPage from './pages/NotFoundPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './NavBar'

function RequireAuth({ children }) {
  const user = window.sessionStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

// function ProtectedPage() {
//   return <h3>Protected</h3>
// }

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={Home} exact />
          <Route path="/about" element={About} exact />
          <Route path="/protected" element={
            <RequireAuth>
              <Route path="/article-list" element={Articles} exact />
              <Route path="/article/:name" element={Article} exact />
              <Route path="/comments/:name" element={Comments} exact />
              <Route path="/login" element={Login} exact />
              <Route path="/tree" element={TreePage} exact />
              <Route element={NotFoundPage} />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
