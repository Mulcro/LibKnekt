const Book = require("../model/Book");
const User = require("../model/User");

const borrowBook = async(req,res) => {

    //Create return code to allow user to return book
    console.log("hit");
    if(!req.body.username || !req.params.bookId) return res.sendStatus(422);

    const book = await Book.findById(req.params.bookId).exec();
    const user = await User.findOne({username: req.body.username});

    if(user.books.includes(req.params.bookId)) return res.sendStatus(409);

    if(!book || !user) return  res.sendStatus(404);
    
    if(user.books.length === 5) return res.sendStatus(409).json({message: "You can only borrow 5 books at a time"});
    if(user.books.includes(req.params.bookId)) return res.sendStatus(409).json({message: "You have already borrowed this book"});

    User.findOneAndUpdate(
        {username: req.body.username},
        {$push: {books: req.params.bookId}},
        (error,success) => {
            if(error){
                console.log(error);
            }
        }
        );

    if(book.quantity === 0) return res.sendStatus(409).json({message: "Book is not available"});
    book.quantity -= 1;
    
    const result2 = await book.save();

    if(!result2) return res.sendStatus(500);

    res.json(result2);
}

module.exports = {borrowBook}