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

function changeHasRead() {
    const currentBookIndex = this.dataset.index;
    myLibrary[currentBookIndex].hasRead = this.checked ? 'read' : 'notRead';
    console.log(myLibrary);
}

function createStatusCheckbox(newBookRow, readStatus, bookNumber) {
    let readCell = newBookRow.insertCell(3);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'status';
    checkbox.value = 'status';
    checkbox.id = 'status';
    checkbox.dataset.index = bookNumber;

    if (readStatus === 'read') {
        checkbox.checked = true;
    }

    let label = document.createElement('label');
    label.htmlFor = 'status';
    label.appendChild(document.createTextNode('Read'));
    readCell.appendChild(checkbox);
    readCell.appendChild(label);

    const readStatusCheckbox = container.querySelector(`#status[data-index="${bookNumber}"`);
    readStatusCheckbox.addEventListener('change', changeHasRead);
}

function updateIndex() {
    //const bookRowsToUpdate = container.querySelectorAll()
    const checkboxesToUpdate = container.querySelectorAll('#status');
    let i = 0;
    checkboxesToUpdate.forEach(checkboxToUpdate => {
        checkboxToUpdate.dataset.index = i;
        i++;
    });
    const removeButtonsToUpdate = container.querySelectorAll('td[button]');
    i = 0;
    removeButtonsToUpdate.forEach(removeButtonToUpdate => {
        removeButtonToUpdate.dataset.index = i;
        i++;
    });
}

function removeBook () {
    const currentBookIndex = this.dataset.index;
    myLibrary.splice(currentBookIndex, 1);
    updateIndex();
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
    console.log(myLibrary);
}

function createRemoveButton(newBookRow, bookNumber) {
    let removeButtonCell = newBookRow.insertCell(4);
    let removeButton = document.createElement('button');
    removeButton.dataset.index = bookNumber;
    const removeButtonText = document.createTextNode('Remove Book');
    removeButton.appendChild(removeButtonText);
    removeButtonCell.appendChild(removeButton);

    removeButton.addEventListener('click', removeBook);
}

function addBookToTable(currentBook, bookNumber) {
    let tableRef = document.querySelector('table');
    let newBookRow = tableRef.insertRow(bookNumber+1);
    newBookRow.className = `myLibrary[${bookNumber}]`;

    createCell(newBookRow, 0, currentBook.title);
    createCell(newBookRow, 1, currentBook.author);
    createCell(newBookRow, 2, currentBook.numberOfPages);

    createStatusCheckbox(newBookRow, currentBook.hasRead, bookNumber);
    createRemoveButton(newBookRow, bookNumber);
}

function addBookToLibrary(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    currentBook = new Book(formProps.title, formProps.author, formProps.numberOfPages, formProps.hasRead);
    myLibrary.push(currentBook);
    currentBookIndex = myLibrary.indexOf(currentBook);
    addBookToTable(currentBook, currentBookIndex);
    clearForm();
    bookNumber += 1;
}

function showForm() {
    newBookButton.style.display = "none";
    form.style.display = "block";
}

form.addEventListener("submit", addBookToLibrary);
newBookButton.addEventListener("click", showForm);

