import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import SideBar from './Components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <SideBar>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </SideBar>
      </div>
    </Router>
  );
}

export default App;
