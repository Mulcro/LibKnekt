const Book = require('../model/Book');

const getBooks = async (req,res) => {
    const books = await Book.find({}).populate('author').populate('category').exec();
    if(!books) return res.sendStatus(404).json({"message":"Books not found"});
    res.json(books);
};

const getBook = async (req,res) => {
    const book = await Book.findById(req.params.bookId).populate("category").populate("author");
    if(!book) return res.sendStatus(404).json({"message":"Book was not found"});
    res.json(book);
};


const createBook = async (req,res) => {
    if(!req.body.summary || !req.body.title || !req.body.author || !req.body.category || !req.body.quantity) {
        return res.sendStatus(404);
    }

    const result = await Book.create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        summary: req.body.summary,
        quantity: req.body.quantity
    });

    if(!result) return res.sendStatus(500);

    res.json(result);
}

const modifyBook = async (req,res) => {
    console.log(req.body);
    if(!req.body) return res.sendStatus(422);

    const book = await Book.findById(req.params.bookId);

    if(!book) return res.sendStatus(404);

    if(req.body.bookTitle)
        book.title = req.body.bookTitle;
    if(req.body.bookCategory)
        book.category = req.body.bookCategory;
    if(req.body.bookAuthor)
        book.author = req.body.bookAuthor;
    if(req.body.bookSummary)
        book.summary = req.body.bookSummary;
    if(req.body.bookQuantity)
        book.quantity = req.body.bookQuantity;

    const result = await book.save();
    if(!result) return res.sendStatus(500);

    res.json(result);
}

const deleteBook = async (req,res) => {
    const result = await Book.findByIdAndDelete(req.params.bookId);
    if(!result) return res.sendStatus(500);

    res.json(result);
}


module.exports = {getBooks,getBook,createBook,modifyBook,deleteBook};