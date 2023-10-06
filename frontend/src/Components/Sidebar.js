import '../assets/sidebar.css';
import {useState,useEffect,useRef} from 'react';
import {IoIosArrowForward} from 'react-icons/io';
import {IoIosArrowBack} from 'react-icons/io';

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
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </section>

            <section className="appContent">
                {props.children}
            </section>
            
        </div>
     );
}
 
export default SideBar;