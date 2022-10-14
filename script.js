const myLibrary = [];

function Book(title, author, numberOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = numberOfPages;
    this.read = hasRead;
    this.info = function() {
        const textInfo = `${title} by ${author}, ${numberOfPages} pages, ${hasRead} been read`;
        return textInfo;
    }
}

function addBookToLibrary() {
    
};
