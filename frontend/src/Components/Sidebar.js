import {Link} from 'react-router-dom';
import '../assets/sidebar.css';
import {useState,useEffect,useRef} from 'react';
import {IoIosArrowForward} from 'react-icons/io';
import {IoIosArrowBack} from 'react-icons/io';
import {data} from '../assets/data/sidebarData';

const SideBar = (props) => {
    const [sideBarOpen, setSideBar] = useState(false);
    const [isVisible, setVisiblity] = useState(false);
    const sideBarRef = useRef();
    const sideBarToggle = useRef();

    const toggleSideBar = () => {
        const visibility = sideBarRef.current.getAttribute("data-sideBarOpen");
        
        sideBarRef.current.setAttribute("data-sideBarOpen", visibility === "false" ? "true" : "false");

        if(visibility === "false"){
            setSideBar(true);
        }
        else{
            setSideBar(false);
        }
    }

    useEffect(() => {
        console.log(isVisible);
    }, [isVisible]);
    
    const triggerToggleVisisbility = () => {
        setVisiblity(!isVisible);
    }

    return ( 
        <div className="sideBarComp">
            
            <div onClick={() => triggerToggleVisisbility()} className="sidebarViewToggle">
                
            </div>

            <IoIosArrowForward ref={sideBarToggle} data-isVisible={isVisible} onClick={() => toggleSideBar()} className={sideBarOpen === true ? "hidden" : "sideBarToggle"} size={20}/>

            <IoIosArrowBack onClick={() => toggleSideBar()} className={sideBarOpen === true ? "sideBarToggle2" : "hidden"} size={14}/>

            <section ref={sideBarRef} className="sideBar" data-sideBarOpen="false">
                
                <ul  className="sideBarItems">
                    {data.map((item,key) => {
                        return(
                            <li key={key} className={item.cName}>
                                <Link to={item.path}>
                                    <div>
                                        <div>
                                            <p>{item.icon}</p>  
                                        </div>
                                        <div>
                                            <p id='itemTitle'>{item.title}</p> 
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section className="appContent">
                {props.children}
            </section>
            
        </div>
     );
}
 
export default SideBar;