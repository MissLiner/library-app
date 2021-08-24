let myLibrary = [];
let newTitle;
let newAuthor;
let newLength;
let newStatus;

const newBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book-form');
const submitBtn = document.getElementById('submit-btn');


function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.length = pages
    this.readStatus = readStatus
}

Book.prototype.describeBook = function(book) {
   return this.title + '\n by \n' + this.author + ' ' + this.length + 'pp';
}

addBookToLibrary = (book) => myLibrary.unshift(book);

const book1 = new Book('The Secret Garden', 'Frances Hodgson Burnett', '247', 'Read: Yes');
const book2 = new Book('Many Waters', 'Madeleine L\'Engle', '368', 'Read: No');
const book3 = new Book('Sparky', 'Annabelle Stephenson', '3', 'Read: Yes')

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

const libraryShelf = document.getElementById('library-shelf');
let shelvedBooks = document.querySelectorAll('.shelved-books');

clearShelf = () => { 
    while (libraryShelf.firstChild) {
        libraryShelf.removeChild(libraryShelf.firstChild);
    }
}

addStatusBtn = () => {
    for (i = myLibrary.length-1; i >= 0; i--) {
        let statusBtn = document.createElement('button');
        statusBtn.className = 'status-btn book-btns';
        document.getElementById(`${i}`).appendChild(statusBtn);
        statusBtn.dataset.bookindex = `${i}`;
        statusBtn.textContent = myLibrary[i].readStatus;
    }
}

addRemoveBtn = () => {
    for (i = myLibrary.length-1; i >= 0; i--) {
        let removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn book-btns';
        removeBtn.textContent = 'Remove';
        document.getElementById(`${i}`).appendChild(removeBtn);
        removeBtn.dataset.bookindex = `${i}`;
    }
}

const bookColors = ['#45003D', '#0D0058', '#105401', '#42290C']
const bookColorOrder = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]

shelveBooks = () => {
    libraryShelf.appendChild(newBookBtn);
    myLibrary.forEach(item => {
        let shelfBook = document.createElement('div');
        shelfBook.className = `shelved-books`;
        shelfBook.style.backgroundColor = bookColors[bookColorOrder[myLibrary.indexOf(item)]];
        shelfBook.id = myLibrary.indexOf(item);
        
        let shelfTitle = document.createElement('h2');
        shelfTitle.className = 'gold-text';
        shelfBook.appendChild(shelfTitle);
        shelfTitle.textContent = item.title;
        
        let shelfAuthor = document.createElement('h3');
        shelfAuthor.className = 'gold-text';
        shelfBook.appendChild(shelfAuthor);
        shelfAuthor.textContent = item.author;

        let shelfLength = document.createElement('h4');
        shelfLength.className = 'gold-text';
        shelfBook.appendChild(shelfLength);
        shelfLength.textContent = item.length + 'pp';
        libraryShelf.appendChild(shelfBook);
    })
    addStatusBtn();
    addRemoveBtn();
}

shelveBooks(myLibrary);

submitNewBook = () => {
    let newBook = new Book(newTitle, newAuthor, newLength, newStatus);
    addBookToLibrary(newBook);
    clearShelf();
    shelveBooks(myLibrary);
}

let quietSign = document.getElementById('quiet-sign');

clearFields = () => {
    let fields = document.querySelectorAll('input');
    fields.forEach(input => {
        input.textContent = '';
    })
}

document.addEventListener('click', function(event) {
    if (event.target.matches('.remove-btn')) {
        myLibrary.splice(event.target.dataset.bookindex, 1);
        event.target.parentNode.remove();
    }
    if (event.target.matches('.status-btn')) {
        myLibrary[event.target.dataset.bookindex].readStatus === 'Read: Yes' ? 
        myLibrary[event.target.dataset.bookindex].readStatus = 'Read: No' :
        myLibrary[event.target.dataset.bookindex].readStatus = 'Read: Yes';
        event.target.textContent = myLibrary[event.target.dataset.bookindex].readStatus;
    }
    if (event.target.matches('#new-book-btn')) {
        newBookForm.classList.remove('hidden');
        submitBtn.classList.remove('hidden');
        // newBookBtn.classList.add('hidden');
        libraryShelf.classList.add('hidden');
        quietSign.classList.add('hidden');

    }
    if(event.target.matches('#close-btn')) {
        document.getElementById('new-book-form').reset();
        // newBookBtn.classList.remove('hidden');
        newBookForm.classList.add('hidden');
        submitBtn.classList.add('hidden');
        libraryShelf.classList.remove('hidden');
        quietSign.classList.remove('hidden');
    }
    if (event.target.matches('#submit-btn')) {
        newTitle = document.getElementById('title-input').value;
        newAuthor = document.getElementById('author-input').value;
        newLength = document.getElementById('length-input').value;
        newStatus = document.getElementById('read-status').value;
        if (isNaN(newLength) === true) {
            alert('Please enter a number for Book Length');
        }
        else if (newTitle && newAuthor && newLength) {
        submitNewBook();
        document.getElementById('new-book-form').reset();
        // newBookBtn.classList.remove('hidden');
        newBookForm.classList.add('hidden');
        submitBtn.classList.add('hidden');
        libraryShelf.classList.remove('hidden');
        quietSign.classList.remove('hidden');
        }
        else {
            alert("Please complete all fields");
        }
    }
}, false
);
