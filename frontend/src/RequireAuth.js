import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import UserContext from '../Context/userContext';    

const RequireAuth = ({allowedRoles}) => {
    const [user,setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(!user);
        if(!user) 
        {
            navigate("/login", {state:{from:location}, replace: true});
        }
        else if (user.roles.filter(role => allowedRoles.includes(role)).length === 0){
            alert("You are not authorized to access this page");

            navigate("/",{state:{from:location}, replace: true});

        }
    }, [])

    useEffect(() => {
        if(!user){
            navigate("/login", {state:{from:location}, replace: true});
        }
    }, [user])

    return(
        <Outlet/>
    )
}

export default RequireAuth;