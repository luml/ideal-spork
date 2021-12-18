import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import NavBar from './NavBar'
import './App.less';


// function ProtectedPage() {
//   return <h3>Protected</h3>
// }

function RequireAuth() {
  const user = window.sessionStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" />
  }
}
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
              <Route path="/login" element={Login} exact />
              <Route element={NotFoundPage} />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;