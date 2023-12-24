import {GiHamburgerMenu} from 'react-icons/gi';
import {useRef,useEffect,useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import '../assets/navbar.css'
const Navbar = () => {
    const navClose = useRef();
    const navRef = useRef();
    const [navOpen,setNavOpen] = useState(false);

    useEffect(() => {
        if(navClose.current){
            navClose.current.classList.add('hidden');
        }

    }, []);

    const toggleNav = () => {
        const navStatus = navRef.current.getAttribute('data-visible');
        navRef.current.setAttribute('data-visible', navStatus === "true" ? "false" : "true");

        if(navStatus === "false"){
            setNavOpen(true);
        }
        else{
            setNavOpen(false);
        }
    }

    return (
        <div className="navbar">
            <div className="logoSection">
                {/* Logo */}
                <h2>
                    LibKnet    
                </h2>
            </div>
            
            <div className="navItems">
                <GiHamburgerMenu onClick={() => toggleNav()} className={navOpen === false ? "mobileNavToggle" : "hidden"} size={25}/>
                <AiOutlineClose onClick={() => toggleNav()} className={navOpen === false ? "hidden" : "mobileNavToggle"} ref={navClose} size={25}/>

                <ul ref={navRef} data-visible="false">
                    <li>
                        <Link to ="/login">Login</Link>
                    </li>
                    <li>
                        <Link to ="/about">About</Link>
                    </li>
                    <li>
                        <Link to ="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to ="/admin">Admin</Link>
                    </li>
                </ul>
            </div>
        </div>
      );
}
 
export default Navbar;
