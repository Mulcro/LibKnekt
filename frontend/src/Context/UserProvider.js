import UserContext from './userContext';
import {useState} from 'react';
import useRefresh from '../hooks/useRefresh';

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    if(!user){
        sessionStorage.removeItem("token");
    }
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;