class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(title) {
        this.books = this.books.filter(b => b.title !== title);
    }

    listBooks(sortBy = null) {
        if (sortBy === "year") {
            return [...this.books].sort((a, b) => a.year - b.year);
        }
        return this.books;
    }
}


const library = new Library();
library.addBook(new Book("A", "A", 2020));
library.addBook(new Book("B", "B", 2018));
console.log(library.listBooks("year"));
