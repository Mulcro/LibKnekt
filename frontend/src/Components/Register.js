import {Link} from 'react-router-dom';
import "../assets/register.css";
import { useEffect, useRef, useState } from 'react';

const NAME_REGEX = /^[A-Z][a-z]{2,30}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#$%]).{8,24}$/;

const Register = () => {
    const [uName,setUname] = useState("");
    const [uFocus,setUfocus] = useState();
    const [validUname, setValidUname] = useState(false);

    const [pwd,setPwd] = useState("");
    const [pwdFocus,setPfocus] = useState();
    const [validPwd, setValidPwd] = useState(false);

    const [email,setEmail] = useState("");
    const [emailFocus,setEmailFocus] = useState();
    const [validEmail, setValidEmail] = useState(false);

    const [fName,setFname] = useState("");
    const [fNameFocus,setFnameFocus] = useState();
    const [validFname, setValidFname] = useState(false);

    const [lName,setLname] = useState("");
    const [lNameFocus,setLnameFocus] = useState();
    const [validLname, setValidLname] = useState(false);

    const [err,setErrMsg] = useState("");

    const errRef = useRef();
    const fnameRef = useRef();

    useEffect(() => {
        fnameRef.current.focus();
    }, [])

    useEffect(() => {
       const result = NAME_REGEX.test(fName);
       setValidFname(result);
       console.log(result);
    },[fName]);

    useEffect(() => {
       const result = NAME_REGEX.test(lName);
       setValidLname(result);
    },[lName]);

    useEffect(() => {
       const result = EMAIL_REGEX.test(email);
       setValidEmail(result);
    },[email]);

    useEffect(() => {
       const result = USER_REGEX.test(uName);
       setValidUname(result);
    },[uName]);

    useEffect(() => {
       const result = PWD_REGEX.test(pwd);
       setValidPwd(result);
    },[pwd]);

    const handleSubmit = e => {
        e.preventDefault();
        const url = '';
        fetch(url, {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                firstname: fName,
                lastname: lName,
                email: email,
                username: uName,
                password: pwd
            })
        })
        .then(res => {
            if(res.status === 200)
                return res;
            
            throw new Error(res.status);
        })
        .then(data => {
            console.log("success");
            console.log(data);
        })
        .catch((err => {
            console.log(err.response.status);
            if(!err){
                setErrMsg("No response from the server");
            } 
            else if (err.response.status === 409){
                setErrMsg("Username taken");
            }
            else{
                setErrMsg("Registration failed, try again");
            }
            errRef.current.focus();
        }));

        setUname('');
        setPwd('');
    }
    
    return ( 
        <div className="registerSection">
            <h2>Register</h2>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <p ref={errRef} className={err ? "errMsg" : "hide"}>{err}</p>
                <label htmlFor="fName">First Name:</label>
                <input 
                    type="text" 
                    ref={fnameRef}
                    value={fName}
                    required
                    onChange={e => setFname(e.target.value)}
                    onFocus={() => setFnameFocus(true)}
                    onBlur={() => setFnameFocus(false)}
                />
                <p className={fNameFocus ? "instructions" : "hide"}>Enter your First Name</p>

                <label htmlFor="lName">Last Name:</label>
                <input 
                    type="text" 
                    value={lName}
                    required
                    onChange={e => setLname(e.target.value)}
                    onFocus={() => setLnameFocus(true)}
                    onBlur={() => setLnameFocus(false)}
                />
                <p className={lNameFocus ? "instructions" : "hide"}>Enter your Last Name</p>

                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />

                <p className={emailFocus ? "instructions" : "hide"}>Enter your Username</p>
                <label htmlFor="uName">Username:</label>
                <input 
                    type="text" 
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
                    value={pwd}
                    required
                    onChange={e => setPwd(e.target.value)}
                    onFocus={() => setPfocus(true)}
                    onBlur={() => setPfocus(false)}
                />
                <p className={pwdFocus ? "instructions" : "hide"}>Enter your Password</p>

                <input className="submit" type="submit" disabled={validFname && validLname && validEmail && validPwd && validUname ? false : true} />
                <p>Already have an account? <Link to="/login">Log in here!</Link></p>
            </form>
        </div>
     );
}
 
export default Register;