import { useEffect } from 'react';
import '../../assets/bookCover.css';
import {Link, useParams} from 'react-router-dom'
import BaseUrl from '../../BaseUrl';
//This is the component for the book objects displayed whenever the book covers are displayed

//Data prop is meant to revieve book object
//Id arguement is temporary - remove later
const Book = ({data,id}) => {

    useEffect(() => {
        console.log("Data: " + data);
    },[]);

    let book;

    if(!data && id) {
        book = fetch(BaseUrl + `books/${id}`,
        {
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => {
            if(res.ok) 
                return res.json();
            throw new Error(res.status);
        })
        .then(data => data = data)
        .catch(err => console.log(err));
    };
    // console.log(data);
    return ( 
        <div className="book">
            <div>
                {/* Change to ${data.id} when using real database */}
                <Link to={`/books/${data ? data._id : book?._id}`}>
                    <p>{data ? data.title : book?.title}</p>
                    <p>{data ? data.author.firstname : book?.author?.firstname}</p>
                </Link>                
            </div>
        </div>
     );
}
 
export default Book;