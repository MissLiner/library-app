let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.length = pages
    this.readStatus = readStatus
  }

  Book.prototype.describeBook = function(book) {
    return this.title + ' by ' + this.author + ', ' + this.length + ' pages, ' + this.readStatus;
  }

addBookToLibrary = (book) => myLibrary.push(book);

const book1 = new Book('A Little Princess', 'Frances Hodgson Burnett', '160', 'read');
const book2 = new Book('The Secret Garden', 'Frances Hodgson Burnett', '247', 'read');
const book3 = new Book('Many Waters', 'Madeleine L\'Engle', '368', 'not read');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

const libraryShelf = document.getElementById('library-shelf');
let shelvedBooks = document.querySelectorAll('.shelved-books');

clearShelf = () => {
    for (i = libraryShelf.childNodes.length; i > 0; i--) {
        libraryShelf.removeChild(document.querySelector('.shelved-books'));
    }
}


//if (myLibrary.length > 0)
addRemoveBtn = () => {
     for (i = myLibrary.length-1; i >= 0; i--) {
            let removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            document.getElementById(`${i}`).appendChild(removeBtn);
            removeBtn.dataset.bookindex = `${i}`;
    }
}

// (parent, index) => {
//     let removeBtn = document.createElement('button');
//     removeBtn.className = 'remove-btn';
//     removeBtn.textContent = 'Remove';
//     removeBtn.dataset.bookindex = index;
//     parent.appendChild(removeBtn);
// }


shelveBooks = () => {
    myLibrary.forEach(item => {
        let shelfBook = document.createElement('div');
        shelfBook.className = 'shelved-books';
        shelfBook.id = myLibrary.indexOf(item);
        shelfBook.textContent = item.describeBook();
        libraryShelf.appendChild(shelfBook);
})
addRemoveBtn();
}

shelveBooks(myLibrary);
console.log(myLibrary);


const newBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book-form');
const submitBtn = document.getElementById('submit-btn');

newBookBtn.addEventListener('click', () => {
    newBookForm.classList.remove('hidden');
    submitBtn.classList.remove('hidden');
    newBookBtn.classList.add('hidden');
})

submitBtn.addEventListener('click', () => {
    let newTitle = document.getElementById('title-input').value;
    let newAuthor = document.getElementById('author-input').value;
    let newLength = document.getElementById('length-input').value;
    let newStatus = document.getElementById('read-status').value;
    let newBook = new Book(newTitle, newAuthor, newLength, newStatus);
    addBookToLibrary(newBook);
    clearShelf();
    shelveBooks(myLibrary);
    console.log(myLibrary);
})

submitBtn.addEventListener('click', () => {
    newBookBtn.classList.remove('hidden');
    newBookForm.classList.add('hidden');
})



document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function removeBook() {
        myLibrary.splice(button.dataset.bookindex, 1);
        button.parentNode.remove();
        //document.getElementById(button.dataset.bookindex).remove();
    })
})