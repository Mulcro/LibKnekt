const Book = require('../model/Book');

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const handleSearch = async (req,res) => {
    const title = req.body.title;
    const category = req.body.category;
    const author = req.body.author;

    const filter = {};

    if(title)
        filter.title = { $regex: new RegExp(escapeRegex(title), 'i') };
    if(category)
        filter.category = category;
    if(author)
        filter.author= author;

    if(Object.keys(filter).length === 0)
        return res.json([]);

    const books = await Book.find(filter).populate('category').populate('author').exec();

    if(!books) return res.status(500);

    res.status(200);
    return res.json(books);
}

module.exports = {handleSearch};