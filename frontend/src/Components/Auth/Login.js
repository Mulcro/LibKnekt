import { useState, useEffect, useRef, useContext} from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";
import '../../assets/login.css'
import UserContext from "../../hooks/userContext";

const Login = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useContext(UserContext);
    // const [token, setToken] = useContext(UserContext);

    const [uName,setUname] = useState("");
    const [uFocus,setUfocus] = useState(false);

    const [pword,setPword] = useState("");
    const [pwordFocus,setPwordFocus] = useState(false);

    const [err, setErr] = useState();

    const [success, setSuccess] = useState(false);

    const errRef = useRef();
    const userRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:4500/login";
        fetch(url,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                user: uName,
                pwd: pword
        })
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            sessionStorage.setItem("token",data.accessToken);
            localStorage.setItem("token",data.refreshToken);
            delete data.accessToken;
            delete data.refreshToken;
            setUser(data);
            setSuccess(true);
            setTimeout(() =>{
                navigate(from,{replace:true});
            },1500)
        })
        .catch((err)=>{
            if(err.message === "401"){
                setErr("Wrong username or password.")
            }
            else{

                setErr("Login failed, try again.")
            }
            errRef.current.focus();
        })      

        setUname('');
        setPword('');
    }

    useEffect(() => {
        userRef.current.focus();
        setUfocus(true);
    },[]);

    return (
            <div className="loginPage">
                <div className={success ? "success" : "hide"}>
                    <div className="successInner">
                        <p>Welcome {user?.user}, you have successfully logged in!</p>
                    </div>
                </div>
                <h2>Login</h2>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <p ref={errRef} className={err ? "errMsg" : "hide"}>{err}</p>
                    <label htmlFor="uName">Username:</label>
                    <input 
                        type="text" 
                        ref={userRef}
                        value={uName}
                        required
                        onChange={e => setUname(e.target.value)}
                        onFocus={() => setUfocus(true)}
                        onBlur={() => setUfocus(false)}
                    />
                    <p className={uFocus ? "instructions" : "hide"}>Enter your Username</p>

                    <label htmlFor="pword">Password:</label>
                    <input 
                        type="password"
                        value={pword}
                        required
                        onChange={e => setPword(e.target.value)}
                        onFocus={() => setPwordFocus(true)}
                        onBlur={() => setPwordFocus(false)}
                    />
                    <p className={pwordFocus ? "instructions" : "hide"}>Enter your Password</p>

                    <input className="submit" type="submit" disabled={uName && pword ? false : true} />
                    <p>Are you new here? <Link to="/register">Sign up here!</Link></p>
                </form>
            </div>
     );
}
 
export default Login
;