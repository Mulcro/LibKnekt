import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import SideBar from './Components/Sidebar';
import Login from './Components/Login';
import Register from './Components/Register';
import DisplayBooks from './Components/Books/DisplayBooks';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <SideBar>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/books' element={<DisplayBooks title={"All Bookd"}/>}/>
          </Routes>
        </SideBar>
      </div>
    </Router>
  );
}

export default App;
