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

addBookToLibrary = (book) => {
     myLibrary.push(book);
     }

const book1 = new Book('A Little Princess', 'Frances Hodgson Burnett', '160', 'read');
const book2 = new Book('The Secret Garden', 'Frances Hodgson Burnett', '247', 'read');
const book3 = new Book('Many Waters', 'Madeleine L\'Engle', '368', 'not read');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

const libraryShelf = document.getElementById('library-shelf');

myLibrary.forEach(item => {
    let shelfBook = document.createElement('div');
    shelfBook.className = 'shelvedBooks';
    shelfBook.id = `book${myLibrary.indexOf(item)}`;
    shelfBook.textContent = item.describeBook();
    libraryShelf.appendChild(shelfBook);
});

const newBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book-form');

newBookBtn.addEventListener('click', () => {
    newBookForm.classList.remove('hidden');
    newBookBtn.classList.add('hidden');
})

const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
    newBookBtn.classList.remove('hidden');
    newBookForm.classList.add('hidden');
})
