const myLibrary = [];

const container = document.querySelector(".container");
const formButton = document.querySelector("button");
const form = document.querySelector("form");

const newBookEntry = document.createElement('div');

function Book(title, author, numberOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.hasRead = hasRead;
    this.info = function() {
        const textInfo = `${title} by ${author}, ${numberOfPages} pages, ${hasRead} been read`;
        return textInfo;
    }
}

function addBookToLibrary(e) {
    //const title = document.getElementById("title").value;
    //console.log(title);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    myLibrary.push(new Book(formProps.title, formProps.author, formProps.numberOfPages, formProps.hasRead));
    console.log(myLibrary);
}

//formButton.addEventListener("click", addBookToLibrary);

form.addEventListener("submit", addBookToLibrary);
console.log(myLibrary);