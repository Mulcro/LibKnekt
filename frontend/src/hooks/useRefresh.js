import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/userContext";

const useRefresh = (userData) => {

    const [user,setUser] = useContext(UserContext);
    
    useEffect(() => {
        const refreshToken = () => {
            if(!userData) {
                if(!localStorage.getItem("token")){
                    return null;
                }
            };

            const token = localStorage.getItem("token");

            fetch("http://localhost:4500/refresh", {
                headers:{
                    "authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error(res.status);
            })
            .then(data => {
                sessionStorage.setItem("token",data.accessToken);

                //Checks if user should still be logged
                if(!userData){
                    setUser(data);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        
        //Invoke func immedietly before running it at intervals
        refreshToken();

        const refreshTokenInterval = setInterval(() => {
            refreshToken();
        }, 4*60*1000);

        return () => clearInterval(refreshTokenInterval);
    },[])

}

export default useRefresh;