import {useEffect, useState} from 'react';

const useFetch = (url) => {

    const [data,setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [err, setErr] = useState(false);

    useEffect(() => {
        setPending(true);

        fetch(url)
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