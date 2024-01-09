import { useNavigate } from 'react-router-dom';
import UserContext from '../../hooks/userContext';
import { useContext, useEffect, useState, useRef } from 'react';
import '../../assets/user.css';
import { FaRegWindowClose } from "react-icons/fa";
import DisplayBooks from '../Books/DisplayBooks'; 

const NAME_REGEX = /^[A-Z][a-z]{2,30}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#$%]).{8,24}$/;


const User = () => {
    //There is currently an error whereby the popup is rendered twice and not closed till the close button is clicked twice

    const url = "http://localhost:4500/";
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const firstInputRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState();
    const [userFocus, setUserFocus] = useState(false);

    const [oldpwd,setOldPwd] = useState();
    const [oldPwdFocus, setOldPwdFocus] = useState(false);

    const [newpwd,setNewPwd] = useState();
    const [newPwdFocus, setNewPwdFocus] = useState(false);

    const [newpwdConfirm,setNewPwdConfirm] = useState();
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [validNewPwd, setValidNewPwd] = useState(false);

    const [email,setEmail] = useState();
    const [emailFocus, setEmailFocus] = useState();

    const [firstname, setFirstname] = useState();
    const [firstnameFocus, setFirstNameFocus] = useState();

    const [lastname,setLastname] = useState();
    const [lastNameFocus, setLastNameFocus] = useState();

    const[err,setErr] = useState();

    const [pwdChange, setPwdChange] = useState(false);
    const [modifyUser, setModifyUser] = useState(false);
    const [viewBooks, setViewBooks] = useState(false);

    const [validFirstName, setValidFirstName] = useState(false);
    const [validLastName, setValidLastName] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [books, setBooks] = useState();
    const handleClose = () => {
        setPwdChange(false);
        // if (pwdChange) {
        //     setPwdChange(false);
        // }
        if (modifyUser) {
            setModifyUser(false);
        }
        if (viewBooks) {
            setViewBooks(false);
        }

        setUsername('')
        setOldPwd('')
        setNewPwd('')
        setEmail('')
        setFirstname('')
        setLastname('')
        setValidNewPwd('')
    }
        
    useEffect(() => {     
        if (!user) {
            navigate("/notfound");
        }
    }, [])

    useEffect(() => {
        if(pwdChange || modifyUser){
        firstInputRef.current.focus();
        }
    },[pwdChange,modifyUser,viewBooks])

    useEffect(() => {
        if((PWD_REGEX.test(newpwd)) && (newpwd === newpwdConfirm)){
            console.log("hit");
            setValidNewPwd(true);
        }
        else{
            setValidNewPwd(false);
        }
    },[newpwd,newpwdConfirm]);

    useEffect(() => {
        // Function to validate name
        const validateName = () => {
            setValidFirstName(NAME_REGEX.test(firstname));
            setValidLastName(NAME_REGEX.test(lastname));
        };

        // Function to validate email
        const validateEmail = () => {
            setIsEmailValid(EMAIL_REGEX.test(email));
        };

        validateName();
        validateEmail();
    }, [firstname,lastname, email]);

    const triggerChangePwd = () => {
            setPwdChange(true);
            if (modifyUser) {
                setModifyUser(false);
            }
            if (viewBooks) {
                setViewBooks(false);
            }
    }

    const handleChangePwd = e => {
        e.preventDefault();

        fetch(url + `users/${user.user}/changepwd`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json",
                "authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body:JSON.stringify({
                oldpassword:oldpwd,
                newpassword:newpwd
            })
        })
        .then(res => {
            if(res.ok) return res.json();
            throw new Error(res.status);
        })
        .then(data => {
            alert("Password changed successfully");
            handleClose();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const modifyAccount = () => {
        setModifyUser(true);
        if (pwdChange) {
            setPwdChange(false);
        }
        if (viewBooks) {
            setViewBooks(false);
        }
    }

    const handleModifyAccount = e => {
        e.preventDefault();

        fetch(url + `users/${user.user}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json",
                "authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body:JSON.stringify({
                username,
                firstname,
                lastname,
                email
            })
        })
        .then(res => {
            if(res.ok) return res.json();
            throw new Error(res.status);
        })
        .then(data => {
            alert("Account modified successfully");
            handleClose();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const viewBorrowedBooks = () => {
        const username = user.user;
        fetch(`${url}users/${username}/borrowedbooks`,{
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(data => {
            setBooks(data);
        })
        .catch(err => {
            console.log(err.message);
        })

        setViewBooks(true);
        if (pwdChange) {
            setPwdChange(false);
        }
        if (modifyUser) {
            setModifyUser(false);
        }
    }

    return (
        <div className="userPage">
            <div>
                <h2>Welcome {user?.user}</h2>
                <div className='functions'>
                    <div className="userFunction">
                        <button onClick={() => triggerChangePwd()}>Change Password</button>
                    </div>
                    <div className="userFunction">
                        <button onClick={() => modifyAccount()}>Modify Account</button>
                    </div>
                    <div className="userFunction">
                        <button onClick={() => viewBorrowedBooks()}>View Borrowed Books</button>
                    </div>
                </div>
            </div>
            {pwdChange &&
                <div className="popup">
                    <div className="innerPopup">                    
                        <FaRegWindowClose className="closeButton" size={20} onClick={() => console.log("hit")}/>
                        <form onSubmit={e => handleChangePwd(e)}>
                            <p ref={errRef} className={err ? "errMsg" : "hide"}>{err}</p>
                            <label htmlFor="">Old Password</label>
                            <input 
                                value={oldpwd} 
                                onChange={e => setOldPwd(e.target.value)} 
                                type="text" 
                                ref={firstInputRef}
                                required
                                onFocus={() => setOldPwdFocus(true)}
                                onBlur={() => setOldPwdFocus(false)}
                                />
                            <p className={oldPwdFocus ? "instructions" : "hide"}>Enter your old password</p>
                            <label htmlFor="">New Password</label>
                            <input 
                                value={newpwd} 
                                onChange={e => setNewPwd(e.target.value)} 
                                type="text"
                                required
                                onFocus={() => setNewPwdFocus(true)}
                                onBlur={() => setNewPwdFocus(false)} 
                                />
                            <p id="pwdNote" className={newPwdFocus ? "instructions" : "hide"}>
                                8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: *-_+^£|!@#$%
                            </p> 

                            <label htmlFor="">Confirm New Password</label>
                            <input value={newpwdConfirm} onChange={e => setNewPwdConfirm(e.target.value)} type="text" />

                            <input type="submit" disabled={validNewPwd && oldpwd ? false : true} />
                        </form>
                    </div>
                </div>
            }
            {viewBooks &&
                <div className="popup">
                    <div className="innerPopup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                        <h3>These are the books you have borrowed</h3>

                        {books && books.length > 0 &&
                            <DisplayBooks data={books}/>
                        }
                        {books && books.length === 0 &&
                            <p>You have not borrowed any books</p>
                        }
                        
                    </div>
                </div>
            } 
            {modifyUser &&
                <div className="popup">
                    <div className="innerPopup">
                        <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                        <form onSubmit={e => handleModifyAccount(e)}>
                            <p ref={errRef} className={err ? "errMsg" : "hide"}>{err}</p>
                            <label htmlFor="">First Name</label>
                            <input 
                                value={firstname} 
                                onChange={e => setFirstname(e.target.value)} 
                                type="text" 
                                ref={firstInputRef}
                                required
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                                />
                            <p className={firstnameFocus ? "instructions" : "hide"}>Enter your first name</p>
                            <label htmlFor="">Last Name</label>
                            <input 
                                value={lastname} 
                                onChange={e => setLastname(e.target.value)} 
                                type="text" 
                                required
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                                />
                            <p className={lastNameFocus ? "instructions" : "hide"}>Enter your last name</p>
                            <label htmlFor="">Email</label>
                            <input 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                type="text"
                                required
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)} 
                                />
                            <p id="pwdNote" className={emailFocus ? "instructions" : "hide"}>
                                Enter your email
                            </p> 

                            <input type="submit" disabled={validFirstName && isEmailValid && validLastName ? false : true}/>
                        </form>
                    </div>
                </div>
            }

        </div>
    );
};

export default User;
