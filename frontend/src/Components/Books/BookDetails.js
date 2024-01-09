import {useState, useEffect, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {bookMockData} from '../../assets/data/bookMockData';
import useFetch from '../../hooks/useFetch';
import DisplayBooks from './DisplayBooks';
import '../../assets/bookDetails.css';
import cover from '../../assets/bookcover.jpg';
import UserContext from '../../hooks/userContext';
import BaseUrl from '../../BaseUrl';

//Implement book quantity logic
const  BookDetails = () => {
    const [user, setUser] = useContext(UserContext);

    const {id} = useParams();
    const [book,pending,err] = useFetch(`books/${id}`);
    const [error,setError] = useState(null);
    
    const handleBorrow = e => {
        e.preventDefault();
        const bookId = book._id;

        fetch(BaseUrl + `borrow/${bookId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({username: user.user})
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.status);
        })
        .then(data => {
            if(data){
                alert('Book borrowed successfully');
                console.log(data);
            }
        })
        .catch(err => {
            if(err.message === "409"){
                setError("Book already borrowed or you have reached your borrowing limit of 5 books");
            }
        })
        //TO-DO: Write up logic for borrow function
    }

    return ( 
        <div className="bookDetails">
            {err &&
                <div className="error">

                </div>   
            }
            {pending &&
                <div className="loading">
                    Loading...
                </div>
            }
            {book &&
                <div className="bookDetailsSection">
                    <div className='one'>
                        <div>
                            <h3>Summary</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat beatae quam eligendi debitis ducimus enim expedita, minus molestiae repellendus ipsum incidunt esse quod neque cum doloribus ipsam possimus reprehenderit nemo.</p>
                        </div>

                        <div className="moreLikeThis">
                            <h3>More Like this</h3>
{/* 
                            TO-DO Books not redirecting once clicked on */}
                            <DisplayBooks style={1}/>
                        </div>
                    </div>

                    <div className='two'>
                        <div>
                            <div>
                                <h2>{book.title}</h2>
                                <img src={cover} alt="" />
                            </div>
                            <p> <span className='details'>Author:</span> {book.author?.firstname} {book.author?.lastname}</p>
                            <p> <span className='details'>Category:</span> {book.category?.categoryName}</p>
                            <p> <span className='details'>Quantity Available:</span> {book.quantity}</p>
                        </div>
                        
                        <div>
                            {user &&
                                <div className='borrowSection'>
                                    <button disabled={error ? true : false} onClick={e => handleBorrow(e)}>Borrow</button>
                                    {error &&
                                        <div className="error">
                                            <p>{error}</p>
                                        </div>
                                    }
                                </div>
                            }
                            {!user &&
                                <div className="msg">
                                    <p>Please log in to borrow books</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }  
        </div>
     );
}
 
export default BookDetails;