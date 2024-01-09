import { useContext, useEffect } from 'react';
import '../assets/home.css';
import UserContext from '../hooks/userContext';

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
                </div>
            </section>
        </div>
     );
}
 
export default HomePage;