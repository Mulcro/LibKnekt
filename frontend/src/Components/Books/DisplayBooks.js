import { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Book from '../Books/Book';
import {bookMockData} from '../../assets/data/bookMockData';
import '../../assets/bookDisplay.css';
import UserContext from "../../hooks/userContext";

//Comp that displays book objects

//Title, query,limit, and style props allow this comp to be dynamic and more reusable.
const Books = ({title,style,limit,data}) => {
    const [books,pending,err] = useFetch("books");
    const [user,setUser] = useContext(UserContext);

    if(data) {
        console.log(user);
        return (
            <div>
                <h1>{title}</h1>
                <div className="bookDisplay">
                    {data.map((item,key) => {
                        return <Book id={key} data={item}/>
                    })}                    
                </div>
            </div>
        )
    }

    // TO-DO Implement logic in backend to fetch a limited data
    // if(limit){
        
    // }
    
    // const books = bookMockData;

    return (
        <section className={style == 0 ? "bookSection" : "bookSection-encapsulated"}>
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