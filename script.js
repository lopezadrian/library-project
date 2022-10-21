const myLibrary = [];

const container = document.querySelector(".container");
const formButton = document.querySelector("button");
const form = document.querySelector("form");
const newBookButton = document.querySelector('#newBookButton');

let bookNumber = 0;

function Book(title, author, numberOfPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.hasRead = hasRead;
    if (hasRead === 'read') {
        let readStatusToPrint = 'has';
    } else readStatusToPrint = 'has not';
    this.info = function() {
        const textInfo = `${title} by ${author}, ${numberOfPages} pages, ${readStatusToPrint} been read`;
        return textInfo;
    }
}

function clearForm() {
    form.style.display = "none";    // Hides form upon submission
    newBookButton.style.display = "inline-block"; // Makes new book button reappear
    const titleInput = document.querySelector('#title');
    titleInput.value = '';
    const authorInput = document.querySelector('#author');
    authorInput.value = '';
    const pagesInput = document.querySelector('#numberOfPages');
    pagesInput.value = '';
    return;
}

function createCell(newBookRow, columnIndex, cellText) {
    let newCell = newBookRow.insertCell(columnIndex);
    let newCellText = document.createTextNode(cellText);
    newCell.appendChild(newCellText);
}

function createStatusCheckbox(newBookRow, readStatus) {
    let readCell = newBookRow.insertCell(3);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'status';
    checkbox.value = 'status';
    checkbox.id = 'status';

    if (readStatus === 'read') {
        checkbox.checked = true;
    }

    let label = document.createElement('label');
    label.htmlFor = 'status';
    label.appendChild(document.createTextNode('Read'));
    readCell.appendChild(checkbox);
    readCell.appendChild(label);
}

function addBookToTable(currentBook, bookNumber) {
    let tableRef = document.querySelector('table');
    let newBookRow = tableRef.insertRow(bookNumber+1);
    newBookRow.classList.add(`myLibrary[${bookNumber}]`);

    createCell(newBookRow, 0, currentBook.title);
    createCell(newBookRow, 1, currentBook.author);
    createCell(newBookRow, 2, currentBook.numberOfPages);

    createStatusCheckbox(newBookRow, currentBook.hasRead);
}

function addBookToLibrary(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    myLibrary.push(new Book(formProps.title, formProps.author, formProps.numberOfPages, formProps.hasRead));
    
    addBookToTable(myLibrary[bookNumber], bookNumber);
    clearForm();
    bookNumber += 1;
    console.log(myLibrary);
}

function showForm() {
    newBookButton.style.display = "none";
    form.style.display = "block";
}
form.addEventListener("submit", addBookToLibrary);
newBookButton.addEventListener("click", showForm);
console.log(myLibrary);

