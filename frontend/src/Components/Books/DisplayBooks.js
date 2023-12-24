import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Book from '../Books/Book';
import {bookMockData} from '../../assets/data/bookMockData';
import '../../assets/bookDisplay.css';

//Comp that displays 
const Books = ({title}) => {
    const url = '';
    // const [books,pending,err] = useFetch(url);
    const [pending,setPending] = useState();
    const [err,setErr] = useState();

    const books = bookMockData;

    return (
        <section className="bookSection">
            { err &&
                <div className="error">
                    There was an Error please try again.
                </div>
            }
            {pending &&
                <div className="loading">
                    Loading..
                </div>
            }
            {books &&
                
                <div>
                    <h1>{title}</h1>
                    <div className="bookDisplay">
                        {books.map((item,key) => {
                            return <Book id={key} data={item}/>
                        })}                    
                    </div>

                </div>
            }
        </section>
     );
}
 
export default Books;