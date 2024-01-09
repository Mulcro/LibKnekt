import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Book from './Books/Book';
import '../assets/search.css';
import { FaRegWindowClose } from "react-icons/fa";
import BaseUrl from '../BaseUrl';

const Search = () => {
    const [titleQuery, setTitle] = useState(null);
    const [categoryQuery, setCategory] = useState(null);
    const [authorQuery, setAuthor] =useState(null);

    const [authors, authorsPending, authorsErr] = useFetch(`authors`);
    const [categories, categoriesPending, categoriesErr] = useFetch(`categories`);

    const [results, setResults] = useState(null);

    useEffect(() => {
        if(titleQuery === '')
            setTitle(null);
        
    },[titleQuery])

    useEffect(() => {
        if(categoryQuery === '0')
            setCategory(null);

        console.log(categoryQuery);
    },[categoryQuery])

    useEffect(() => {
        if(authorQuery === '0')
            setAuthor(null);
    },[authorQuery])

    const handleSearch = e => {
        e.preventDefault();

        fetch(BaseUrl + "/search",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    title: titleQuery,
                    author: authorQuery,
                    category: categoryQuery 
                })
            }
        )
        .then(res => {
            if(res.ok)
                return res.json();
            else
                throw new Error(res.status);
        })
        .then(data => {
            setResults(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleClose = () => {
        setResults(null);
    }

    return ( 
        <>
            {categoriesErr && authorsErr &&
                <div className="error">
                    <p>There was an error</p>
                </div>
            }
            {categoriesPending && authorsPending &&
                <div className="loading">
                    <p>loading...</p>
                </div>
            }
            {categories && authors &&

                <div className="search">
                    
                    <form onSubmit={e => handleSearch(e)}>
                        <h2 className='title'>Search Books</h2>
                        <label htmlFor="authorQuery">Author:</label>
                        <select onChange={e => setAuthor(e.target.value)}>
                            <option value={0}>-- Select an Author --</option>
                            {authors.map((author,key) => {
                                return(
                                    <option key={key} value={author._id}>{author.firstname} {author.lastname}</option>
                                )
                            })}
                            <option value={0}>-- Not specified --</option>
                        </select>

                        <label htmlFor="categoryQuery">Category:</label>
                        <select onChange={e => setCategory(e.target.value)}>
                            <option value={0}>-- Select a Category --</option>
                            {categories.map((category,key) => {
                                return(
                                    <option key={key} value={category._id} >{category.categoryName}</option>
                                )
                            })}
                            <option value={0}>-- Not specified --</option>
                        </select>

                        <label htmlFor="titleQuery">Keywords:</label>
                        <input type="text" value={titleQuery} onChange={e => setTitle(e.target.value)}/>

                        <input className="submit" type="submit"/>
                    </form>
        
                    {results &&
                        <div className='results'>
                            <div className="innerResults">
                                <div>
                                    <h3>Results</h3>
                                    <FaRegWindowClose className="closeButton" size={20} onClick={e => handleClose(e)}/>
                                </div>    
                                <div>
                                    {results.map((item,key) => {
                                        return <Book data={item} id={key}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
     );
}
 
export default Search;