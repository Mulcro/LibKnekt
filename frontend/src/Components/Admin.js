import {useState, useEffect, useRef, useContext} from 'react'; 
import '../assets/admin.css';
import { FaRegWindowClose } from "react-icons/fa";
import UserContext from '../hooks/userContext';  

const Admin = () => {
    const [user,setUser] = useContext(UserContext);
    // write state for functions

    const [addOrDeleteRole,setAddOrDeleteRole] = useState(false);
    const [addAuthorOrCategory,setAuthorOrCategory] = useState(false);
    const [modifyAuthorOrCategory,setModifyAuthorOrCategory] = useState(false);
    const [deleteAuthorOrCategory,setDeleteAuthorOrCategory] = useState(false);
    const [addBook,setAddBook] = useState(false);
    const [modifyBook,setModifyBook] = useState(false);
    const [deleteBook,setDeleteBook] = useState(false);
    const [returnBook,setReturnBook] = useState(false);
    const [findBorrowedBooks,setFindBorrowedBooks] = useState(false);


    const [success,setSuccess] = useState(false);
    const [err,setErr] = useState();

    const addRoleErrRef = useRef(null);

    // write trigger functions for each state

    const addOrDeleteTrigger = () => {  setAddOrDeleteRole(!addOrDeleteRole); }
    const addAuthorOrCategoryTrigger = () => {  setAuthorOrCategory(!addAuthorOrCategory); }
    const modifyAuthorOrCategoryTrigger = () => {  setModifyAuthorOrCategory(!modifyAuthorOrCategory); }
    const deleteAuthorOrCategoryTrigger = () => {  setDeleteAuthorOrCategory(!deleteAuthorOrCategory); }
    const addBookTrigger = () => {  
        setAddBook(!addBook)
        getAuthorsOrCategories("author");
        getAuthorsOrCategories("category");
    }
    const modifyBookTrigger = () => {  
        setModifyBook(!modifyBook);
        getBooks();
        getAuthorsOrCategories("author");
        getAuthorsOrCategories("category");
    }
    const deleteBookTrigger = () => {  setDeleteBook(!deleteBook); }
    const returnBookTrigger = () => {  setReturnBook(!returnBook); }
    const findBorrowedBooksTrigger = () => {  
        setFindBorrowedBooks(!findBorrowedBooks);
        getBooks();
    }

    // write functions for each state
    const [username,setUsername] = useState();
    const [foundUser,setFoundUser] = useState();
    const [role,setRole] = useState();
    const [roles,setRoles] = useState([20,10,1]);

    const findUser = e => {
        e.preventDefault();

        fetch(`${BaseUrl}users/${username}`,{
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("User not found");
        })
        .then(data => {
            console.log(data);
            setRoles(roles.filter(role => !data.roles.includes(role)))
            setFoundUser(data);
            setSuccess(true);
        })
        .catch(err => {
            setErr(err.message);
        })
    }

    const addOrDeleteFunction = (num,e) => {
        e.preventDefault();

        switch(num){
            case 1:
                fetch(`${BaseUrl}users/${username}/addrole`,{
                    method: "PATCH",
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userRole: role
                    })
                })
                .then(res => {  
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Role added successfully");
                    setTimeout(() => {
                        setRoles(prevRoles => [...prevRoles]);
                        setFoundUser();
                        setUsername();
                        setRole();
                        setChoice();

                        setSuccess(false);
                        setAddOrDeleteRole(false);
                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
            case 2:
                fetch(`${BaseUrl}users/${username}/deleterole`,{
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    method: "PATCH",
                    body: JSON.stringify({
                        userRole: role
                    })
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Role deleted successfully");
                    setTimeout(() => {
                        setRoles(prevRoles => [...prevRoles]);
                        setFoundUser();
                        setUsername();
                        setRole();
                        setChoice();

                        setSuccess(false);
                        setAddOrDeleteRole(false);
                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })

        }
    }

    const [choice,setChoice] = useState();
    const [firstname,setFirstName] = useState();
    const [lastname,setLastName] = useState();
    const [categoryName,setCategoryName] = useState();
    
    const addAuthorOrCategoryFunction = (e,choice) => {
        e.preventDefault();

        switch(choice){
            case "author":
            console.log(user);
            fetch(`${BaseUrl}authors`,{
                    method: "POST",
                    headers:{   
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        
                    })
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Author added successfully");
                    setTimeout(() => {
                        setAuthorOrCategory(false);
                        setChoice();
                        setFirstName();
                        setLastName();
                        setCategoryName();
                        setChoice();

                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            case "category":
                fetch(`${BaseUrl}categories`,{
                    method: "POST",
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        categoryName,
                        
                    })
                }) 
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Category added successfully");
                    setTimeout(() => {
                        setAuthorOrCategory(false);
                        setChoice();
                        setFirstName();
                        setLastName();
                        setChoice();

                        setCategoryName();
                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            }       
    }

    const [authors,setAuthors] = useState();
    const [categories,setCategories] = useState();

    const [author,setAuthor] = useState();
    const [category,setCategory] = useState();

    const getAuthorsOrCategories = (choice) => {
        switch(choice){
            case "author":
                fetch(`${BaseUrl}authors`,{
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(data => {
                    setAuthors(data);
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            case "category":
                fetch(`${BaseUrl}categories`,{
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    },
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(data => {
                    setCategories(data);
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            }
    }

    const modifyAuthorOrCategoryFunction = (e,choice) => {
        e.preventDefault();

        switch(choice){
            case "author":
                fetch(`${BaseUrl}authors/${author}`,{
                    method: "PATCH",
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        
                    })
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Author modified successfully");
                    setTimeout(() => {
                        setAuthor();
                        setModifyAuthorOrCategory(false);
                        setChoice();
                        setFirstName();
                        setLastName();
                        setCategoryName();
                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            case "category":
                fetch(`${BaseUrl}categories/${category}`,{
                    method: "PATCH",
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        categoryName: categoryName,
                        
                    })
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Category modified successfully");
                    setTimeout(() => {
                        setCategory();
                        setModifyAuthorOrCategory(false);
                        setChoice();
                        setFirstName();
                        setLastName();
                        setCategoryName();
                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            }
    }


    const deleteAuthorOrCategoryFunction = e => {
        e.preventDefault();
        console.log(user.roles);
        switch(choice){

            case "author":
                fetch(`${BaseUrl}authors/${author}`,{
                    method: "DELETE",
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Author deleted successfully");
                    setTimeout(() => {
                        setAuthor();
                        setDeleteAuthorOrCategory(false);
                        setChoice();
                        setFirstName();
                        setLastName();
                        setCategoryName();
                        setChoice();

                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            case "category":
                fetch(`${BaseUrl}categories/${category}`,{
                    method: "DELETE",
                    headers:{
                        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    }
                })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then(() => {
                    alert("Category deleted successfully");
                    setTimeout(() => {
                        setCategory();
                        setDeleteAuthorOrCategory(false);
                        setChoice();
                        setFirstName();
                        setChoice();
                        setLastName();
                        setCategoryName();
                    },2000)
                })
                .catch(err => {
                    console.log(err.message);
                })
                break;
            }
    }
    
    const [bookTitle,setBookTitle] = useState();
    const [bookSummary,setBookSummary] = useState();
    const [bookQuantity,setBookQuantity] = useState();

    const [books,setBooks] = useState();

    const getBooks = () => {
        fetch(`${BaseUrl}books`,{
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
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
    }

    const addBookFunction = e => {
        e.preventDefault();

        fetch(`${BaseUrl}books`,{
            method: "POST",
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: bookTitle,
                summary: bookSummary,
                quantity: bookQuantity,
                category,
                author
            })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(() => {
            alert("Book added successfully");
            setTimeout(() => {
                setAddBook(false);
                setBookTitle();
                setBookSummary();
                setBookQuantity();
                setAuthor();
                setCategory();
            },2000)
        })
        .catch(err => {
            console.log(err.message);
        })

    }
    const modifyBookFunction = e => {
        e.preventDefault();

        fetch(`${BaseUrl}books/${choice}`,{
            method: "PATCH",
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookTitle,
                bookSummary,
                bookQuantity,
                bookCategory: category,
                bookAuthor: author
            })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(() => {
            alert("Book modified successfully");
            setTimeout(() => {
                setModifyBook(false);
                setBookTitle();
                setBookSummary();
                setBookQuantity();
                setAuthor();
                setCategory();
                setChoice();
            },2000)
        })
        .catch(err => {
            console.log(err.message);
        })
    }
    const deleteBookFunction = e => {
        e.preventDefault();

        fetch(`${BaseUrl}books/${choice}`,{
            method: "DELETE",
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(() => {
            alert("Book deleted successfully");
            setTimeout(() => {
                setDeleteBook(false);
                setChoice();
            },2000)
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    
    const getUserBorrowedBooks = e => {
        e.preventDefault();

        fetch(`${BaseUrl}users/${username}/borrowedbooks`,{
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
    }

    const returnBookFunction = e => {
        e.preventDefault();

        fetch(`${BaseUrl}users/${username}/returnbook`,{
            method: "PATCH",
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookId: choice
            })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(() => {
            alert("Book returned successfully");
            setTimeout(() => {
                setReturnBook(false);
                setBooks();
                setUsername();
                setChoice();
            },2000)
        })
        .catch(err => {
            console.log(err.message);
        })

    }

    const [users,setUsers] = useState();

    const findBorrowedBooksFunction = e => {
        e.preventDefault();

        fetch(`${BaseUrl}users/findborrowers/${choice}`,{
            method: "POST",
            headers:{
                "authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(data => {
            setUsers(data);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const handleClose = () => {
        setAddOrDeleteRole(false);
        setAuthorOrCategory(false);
        setModifyAuthorOrCategory(false);
        setDeleteAuthorOrCategory(false);
        setAddBook(false);
        setModifyBook(false);
        setDeleteBook(false);
        setReturnBook(false);
        setFindBorrowedBooks(false);
        setSuccess(false);
        setErr();
        setUsername();
        setRole();
        setFoundUser();
        setChoice();
        setFirstName();
        setLastName();
        setCategoryName();
        setAuthor();
        setCategory();
        setBookTitle();
        setBookSummary();
        setBookQuantity();
        setBooks();
        setUsers();
        setAuthors();
        setCategories();
        setRoles([20,10,1]);
    }

    useEffect(() => {
        setBookTitle();
        setBookSummary();
        setBookQuantity();
        setAuthor();
        setCategory();
        setFirstName();
        setLastName();
        setCategoryName();
    },[choice])

    return ( 
        <div className="adminSection">
            <div>
                <h1>Admin</h1>
                <div className='adminFunctions'>
                    <div className="adminFunction" >
                        <button onClick={() => addOrDeleteTrigger()}>Add or Delete roles</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => addAuthorOrCategoryTrigger()}>Add Author or Category</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => modifyAuthorOrCategoryTrigger()}>Modify Author or Category</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => deleteAuthorOrCategoryTrigger()}>Delete Author or Category</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => addBookTrigger()}>Add Book</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => modifyBookTrigger() }>Modify Book</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => deleteBookTrigger()}>Delete Book</button>
                    </div>
                    <div className="adminFunction" >
                        <button onClick={() => returnBookTrigger() }>Return a book</button>
                    </div>
                    <div className="adminFunction">
                        <button onClick={() => findBorrowedBooksTrigger()}>Find Borrowed Books</button>
                    </div>
                </div>
            </div>

            {addOrDeleteRole && 
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>

                        <div className="searchUser">
                        {!success &&
                            <form className='searchForm' onSubmit={e => findUser(e)}>
                                <p className={err ? "errMsg" : "hide"} ref={addRoleErrRef}>{err}</p>
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text" 
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    />
                                <button type="submit">Search User</button>
                            </form>
                        }
                        {success &&
                            <div className="userDetails">
                                <form onSubmit={e => addOrDeleteFunction(1,e)}>
                                    
                                    <label htmlFor="">Add role: </label>
                                    <select onChange={e => setRole(e.target.value)}>
                                        <option value="">--Choose Role--</option>
                                        {roles.map((role,id) => <option value={role} id={id}>{role}</option>)}
                                    </select>
                                    <button type="submit" disabled={!role ? true : false}>Add Role</button>
                                </form>
                                <form onSubmit={e => addOrDeleteFunction(2,e)}>                              
                                    <label htmlFor="">Delete role: </label>
                                    <select onChange={e => setRole(e.target.value)}>
                                        <option value="">--Choose Role--</option>
                                        {foundUser.roles.filter(role => role).map((role,id) => <option value={role} id={id}>{role}</option>)}
                                    </select>
                                    <button type="submit" disabled={!role ? true : false}>Delete Role</button>
                                </form>                                
                            </div>
                        }
                    </div>
                </div>
            }

            {addAuthorOrCategory &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="addAuthorOrCategory">
                        <form onSubmit={e => addAuthorOrCategoryFunction(e,choice)}>
                            <label htmlFor="authorOrCategory">Add Author or Category</label>
                            <select 
                                name="authorOrCategory" 
                                id="authorOrCategory"
                                onChange={e => setChoice(e.target.value)}
                            >
                                <option value="">--Choose--</option>
                                <option value="author">Author</option>
                                <option value="category">Category</option>
                            </select>

                            {choice === "author" &&
                                <>
                                    <label htmlFor="author">Enter new Author</label>
                                    <input 
                                        type="text" 
                                        placeholder="First Name"
                                        required
                                        value={firstname}
                                        onChange={e => setFirstName(e.target.value)}    
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Last Name"
                                        required
                                        value={lastname}
                                        onChange={e => setLastName(e.target.value)}    
                                    />
                                </>
                            }
                            {choice === "category" &&
                                <>
                                    <label htmlFor="author">Enter new Category</label>
                                    <input 
                                        type="text" 
                                        placeholder="Category"
                                        required
                                        value={categoryName}
                                        onChange={e => setCategoryName(e.target.value)}
                                    />
                                </>                      
                            }
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            }
            { modifyAuthorOrCategory &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="modifyAuthorOrCategory">
                        <form onSubmit={e => modifyAuthorOrCategoryFunction(e,choice)}>
                            <label htmlFor="authorOrCategory">Modify Author or Category</label>
                            <select 
                                name="authorOrCategory" 
                                id="authorOrCategory"
                                onChange={e => {
                                    setChoice(e.target.value)
                                    setAuthor();
                                    setCategory();
                                    getAuthorsOrCategories(e.target.value);
                                }}
                            >
                                <option value="">--Choose--</option>
                                <option value="author">Author</option>
                                <option value="category">Category</option>
                            </select>

                            {choice === "author" &&
                                <>
                                    <label htmlFor="">Pick the author to modify</label>
                                    <select onChange={e => setAuthor(e.target.value)} name="" id="">
                                        <option value="">--Choose Author--</option>
                                        {authors &&
                                            authors.map(author => <option value={author._id}>{author.firstname} {author.lastname}</option>)
                                        }
                                    </select>

                                    {choice && author &&
                                        <>
                                            <label htmlFor="author">Enter Author</label>
                                            <input 
                                                type="text" 
                                                placeholder="First Name"
                                                required
                                                value={firstname}
                                                onChange={e => setFirstName(e.target.value)}    
                                            />
                                            <input 
                                                type="text" 
                                                placeholder="Last Name"
                                                required
                                                value={lastname}
                                                onChange={e => setLastName(e.target.value)}    
                                            />
                                        </>
                                    }
                                </>
                            }
                            {choice === "category" &&
                                <>
                                    <label htmlFor="">Pick the Category to modify</label>
                                    <select onChange={e => setCategory(e.target.value)} name="" id="">
                                        <option value="">--Choose Category--</option>
                                        {categories &&
                                            categories.map(category => <option value={category._id}>{category.categoryName}</option>)
                                        }
                                    </select>

                                    {choice && category &&
                                        <>
                                            <label htmlFor="author">Enter New Category Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="New Category Name"
                                                required
                                                value={categoryName}
                                                onChange={e => setCategoryName(e.target.value)}
                                            />
                                        </>
                                    
                                    }
                                </>                  
                            }
                            <button type="submit" disabled={(author && firstname && lastname) || (category && categoryName) ? false : true} >Modify</button>
                        </form>
                    </div>
                </div>
            }
            { deleteAuthorOrCategory &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="deleteAuthorOrCategory">
                        <form onSubmit={e => deleteAuthorOrCategoryFunction(e)}>
                            <label htmlFor="authorOrCategory">Delete Author or Category</label>
                            <select 
                                name="authorOrCategory" 
                                id="authorOrCategory"
                                onChange={e => {
                                    setChoice(e.target.value)
                                    setAuthor();
                                    setCategory();
                                    getAuthorsOrCategories(e.target.value);
                                }
                                }
                            >
                                <option value="">--Choose--</option>
                                <option value="author">Author</option>
                                <option value="category">Category</option>
                            </select>

                            {choice === "author" &&
                                <>
                                    <label htmlFor="">Pick the author to delete</label>
                                    <select onChange={e => setAuthor(e.target.value)} name="" id="">
                                        <option value="">--Choose Author--</option>
                                        {authors &&
                                            authors.map(author => <option value={author._id}>{author.firstname} {author.lastname}</option>)
                                        }
                                    </select>
                                </>
                            }
                            {choice === "category" &&
                                <>
                                    <label htmlFor="">Pick the Category to delete</label>
                                    <select onChange={e => setCategory(e.target.value)} name="" id="">
                                        <option value="">--Choose Category--</option>
                                        {categories &&
                                            categories.map(category => <option value={category._id}>{category.categoryName}</option>)
                                        }
                                    </select>
                                </>                  
                            }
                            <button type="submit" disabled={(author  || category)  ? false : true} >Delete</button>
                        </form>
                    </div>
                </div>
            }

            { addBook &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="addBook">
                        <form onSubmit={e => addBookFunction(e)}>
                            <label htmlFor="">Add Book</label>

                            <label htmlFor="">Book title</label>
                            <input 
                                type="text" 
                                placeholder="Book Name"
                                required
                                onChange={e => setBookTitle(e.target.value)}
                            />

                            <label htmlFor="">Book Summary</label>
                            <textarea 
                                placeholder="Book Description"
                                required
                                onChange={e => setBookSummary(e.target.value)}
                            />

                            <label htmlFor="">Book Quantity</label>
                            <input 
                                type="number" 
                                placeholder="Book Quantity"
                                required
                                onChange={e => setBookQuantity(e.target.value)}
                            />

                            <label htmlFor="">Author</label>
                            <select onChange={e => setAuthor(e.target.value)} name="" id="">
                                <option value="">--Choose Author--</option>
                                {authors &&
                                    authors.map(author => <option value={author._id}>{author.firstname} {author.lastname}</option>)
                                }
                            </select>

                            <label htmlFor="">Category</label>
                            <select onChange={e => setCategory(e.target.value)} name="" id="">
                                <option value="">--Choose Category--</option>
                                {categories &&
                                    categories.map(category => <option value={category._id}>{category.categoryName}</option>)
                                }
                            </select>

                            <button disabled={bookTitle && bookQuantity && bookSummary && author && category ? false : true} type="submit">Add</button>
                        </form>
                    </div>
                </div>
            }

            { modifyBook &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="modifyBook">
                        <form onSubmit={e => modifyBookFunction(e)}>
                            <labal htmlFor="">Pick the book to modify</labal>
                            <select onChange={e => setChoice(e.target.value)} name="" id="">
                                <option value="">--Choose Book--</option>
                                {books &&
                                    books.map(book => <option value={book._id}>{book.title}</option>)
                                }
                            </select>

                            {choice &&
                            <>
                                    <label htmlFor="">Modify Book</label>
                                    <p className="instructions">If you don't wish to modify a parameter please leave it blank</p>
                                    <label htmlFor="">Book title</label>
                                    <input
                                        type="text"
                                        value={bookTitle}
                                        placeholder="Book Name"
                                        onChange={e => setBookTitle(e.target.value)}
                                    />

                                    <label htmlFor="">Book Summary</label>
                                    <textarea
                                        placeholder="Book Description"
                                        value={bookSummary}
                                        onChange={e => setBookSummary(e.target.value)}
                                    />

                                    <label htmlFor="">Book Quantity</label>
                                    <input
                                        type='number'
                                        value={bookQuantity}
                                        placeholder="Book Quantity"
                                        onChange={e => setBookQuantity(e.target.value)}
                                    />

                                    <label htmlFor="">Author</label>
                                    <select onChange={e => setAuthor(e.target.value)} name="" id="">
                                        <option value="">--Choose Author--</option>
                                        {authors &&
                                            authors.map(author => <option value={author._id}>{author.firstname} {author.lastname}</option>)
                                        }
                                    </select>

                                    <label htmlFor="">Category</label>
                                    <select onChange={e => setCategory(e.target.value)} name="" id="">
                                        <option value="">--Choose Category--</option>
                                        {categories &&
                                            categories.map(category => <option value={category._id}>{category.categoryName}</option>)
                                        }
                                    </select>
                                </>
                            }
                            <button disabled={bookTitle || bookQuantity || bookSummary || author || category ? false : true} type="submit">Modify</button>
                        </form>
                    </div>
                </div>
            }

            { deleteBook &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="deleteBook">
                        <form onSubmit={e => deleteBookFunction(e)}>
                        <labal htmlFor="">Pick the book to Delete</labal>
                            <select onChange={e => setChoice(e.target.value)} name="" id="">
                                <option value="">--Choose Book--</option>
                                {books &&
                                    books.map(book => <option value={book._id}>{book.title}</option>)
                                }
                            </select>
                            <button disabled={choice ? false : true} type="submit">Delete</button>
                        </form>
                    </div>
                </div>
            }

            { returnBook &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="returnBook">
                        <form onSubmit={e => returnBookFunction(e)}>
                            <h2>Return Book</h2>

                            <label htmlFor="">Enter Username of Returnee</label>
                            <input 
                                type="text"
                                placeholder="Username" 
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                            <button onClick={(e) => getUserBorrowedBooks(e)}>Search</button>

                            { books &&
                                <div className="displayBooks">
                                    <label htmlFor="">Which book is the user returning?</label>

                                    <select onChange={e => setChoice(e.target.value)} name="" id="">
                                        <option value="">--Choose Book--</option>
                                        {books &&
                                            books.map(book => <option value={book._id}>{book.title}</option>)
                                        }
                                    </select>
                                </div>
                            }
                            <button disabled={ choice ? false : true } type="submit">Return</button>
                        </form>
                    </div>
                </div>
            }

            { findBorrowedBooks &&
                <div className="popup">
                    <FaRegWindowClose className="closeButton" size={20} onClick={() => handleClose()}/>
                    <div className="findBorrowedBooks">
                        <form onSubmit={e => findBorrowedBooksFunction(e)}>
                            <h2>Find borrowed books</h2>

                            <label htmlFor="">Choose Book</label>
                            <select onChange={e => setChoice(e.target.value)} name="" id="">
                                <option value="">--Choose Book--</option>
                                {books &&
                                    books.map(book => <option value={book._id}>{book.title}</option>)
                                }
                            </select>
                            <button type="submit">Find</button>

                            {choice && users &&
                                <div className="displayUsers">
                                    <h3>These are the users who have the`` book borrowed </h3>

                                    <ul className='userList'>
                                        {users &&
                                            users.map(user => 
                                                <li>
                                                    <p>Username: {user.username}</p>
                                                    <p>Email: {user.email}</p>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            }
        </div>
     );
}
export default Admin;