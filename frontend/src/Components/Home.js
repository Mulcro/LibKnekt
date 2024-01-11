import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import UserContext from '../Context/userContext';

const HomePage = () => {
    const [user,setUser] = useContext(UserContext);
    useEffect(() => {
        console.log(user);
    },[]);
    return ( 
        <div className="homePageContainer">
            <section className="homeUpperSection">
                <div>
                    <h1 className="title">
                        Welcome to LibKnet
                    </h1>

                    <h4>Please <span ><Link className='homeLink' to ="/login">Login</Link></span> or <span><Link className='homeLink' to ="/register">Register</Link></span> to Proceed</h4>
                </div>
            </section>
        </div>
     );
}
 
export default HomePage;