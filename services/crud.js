const mongoose=require('mongoose');
const Book=require('../model/Book')

const createDB = () => {

    Book.deleteMany(null,function (err, book) {
        if (err) return console.error(err);
        console.log("successfully deleted");
      });
    
    var book1 = new Book({ 
        author: 'Massimo Sardi',
        title: 'Il ritorno dell arcobaleno',
        code: 130,
        available: true,
        reserved: false});
 
    var book2 = new Book({ 
        author: 'Massimo Sardi',
        title: 'L arcobaleno',
        code: 170,
        available: true,
        reserved: false});
 
    var book3 = new Book({ 
        author: 'Marco Montemagno',
        title: 'Lavorability',
        code: 68,
        available: true,
        reserved: false});

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

async function readReservedDB() {
    var book = await Book.findOne({reserved: true});
    return JSON.stringify(book);
};

async function readAllDB() {
    var books = await Book.find();
    return JSON.stringify(books);
};

async function updateAvailabilityDB(id,availability,_reserved) {
    const filter = { code: id };
    const update = { available: availability, reserved: _reserved };
    var book = await Book.findOneAndUpdate(filter,update);
    return await readDB(id);
};

module.exports = {
    createDB,    
    readDB,
    readAllDB,
    readReservedDB,
    updateAvailabilityDB,
    deleteDB
}