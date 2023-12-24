import '../../assets/bookCover.css';
import {Link} from 'react-router-dom'
//This is the component for the book objects displayed whenever the book covers are displayed

//Data prop is meant to revieve book object
const Book = ({data}) => {
    console.log(data);
    return ( 
        <div className="book">
            <div>
                <Link to={`/book/${data.id}`}>
                    <p>{data.title}</p>
                    <p>{data.author}</p>
                </Link>                
            </div>
        </div>
     );
}
 
export default Book;