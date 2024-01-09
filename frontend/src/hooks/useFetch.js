import {useContext, useEffect, useState} from 'react';
import UserContext from '../Context/userContext';
import BaseUrl from '../BaseUrl';

const useFetch = (ext) => {
    const token = sessionStorage.getItem("token");
    const [data,setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [err, setErr] = useState(false);

    useEffect(() => {
        setPending(true);

        fetch(BaseUrl + ext,{
            headers:{
                "authorization": `Bearer ${token}`,
            }
        })
        .then(res => {
            if(res.status === 200)
                return res.json();
            throw new Error(res);
        })
        .then(res => {
            setData(res);
            setPending(false);
        })
        .catch(() => {
            setPending(false);
            setErr(true);
        })
    }, []);

    return [data,pending,err];
}

export default useFetch;