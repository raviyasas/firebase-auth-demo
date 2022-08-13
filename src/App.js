import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Reset } from './components/auth/Reset';
import { Home } from './components/common/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/reset" element={<Reset/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
