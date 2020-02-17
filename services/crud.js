const mongoose=require('mongoose');
const Book=require('../model/Book')

const createDB = () => {

    Book.deleteMany(null,function (err, book) {
        if (err) return console.error(err);
        console.log("successfully deleted");
      });
    
    var book1 = new Book({ 
        author: 'Oscar Wilde',
        title: 'Il ritratto di Dorian Gray',
        code: 130,
        available: true});
 
    var book2 = new Book({ 
        author: 'Lev Tolstoj',
        title: 'La morte di Ivan Ilic',
        code: 170,
        available: true});
 
    var book3 = new Book({ 
        author: 'Marco Montemagno',
        title: 'Lavorability',
        code: 68,
        available: true});

    var books=[book1,book2,book3]
 
    Book.insertMany(books, function (err, book) {
      if (err) return console.error(err);
      console.log("books saved to bookstore collection.");
    });
};

const deleteDB = () => {
    Book.deleteMany(null,function (err, book) {
        if (err) return console.error(err);
        console.log("successfully deleted");
      });
};

async function readDB(id) {
    var book = await Book.findOne({code: id});
    return JSON.stringify(book);
};

async function readAllDB() {
    var books = await Book.find();
    return JSON.stringify(books);
};

async function updateAvailabilityDB(id,availability) {
    const filter = { code: id };
    const update = { available: availability };
    var book = await Book.findOneAndUpdate(filter,update);
    return await readDB(id);
};

module.exports = {
    createDB,    
    readDB,
    readAllDB,
    updateAvailabilityDB,
    deleteDB
}