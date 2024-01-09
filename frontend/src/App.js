import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import UserProvider from './hooks/UserProvider';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import SideBar from './Components/Sidebar';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import DisplayBooks from './Components/Books/DisplayBooks';
import BookDetails from './Components/Books/BookDetails';
import NotFound from './Components/NotFound';
import AuthorDetails from './Components/Author/AuthorDetails';
import Authors from './Components/Author/Authors';
import Categories from './Components/Category/Category';
import CategoryDetails from './Components/Category/CategoryDetails';
import User from './Components/User/User';
import Search from './Components/Search';
import useRefresh from './hooks/useRefresh';
import UserContext from './hooks/userContext';
import { useContext } from 'react';
import Admin from './Components/Admin';

function App() {

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <SideBar>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/books' element={<DisplayBooks title={"All Books"} style={0}/>}/>
              <Route path='/books/:id' element={<BookDetails/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/users/:id' element={<User/>}/>
              <Route path='/admin' element={<Admin/>}/>

              {/* 404 */}
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </SideBar>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
