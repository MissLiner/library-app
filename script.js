let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.length = pages
    this.readStatus = readStatus
  }

  Book.prototype.describeBook = function(book) {
   return this.title + '\n by \n' + this.author + ' ' + this.length + 'pp';
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
const bookWidths = ['wide', 'wider', 'widest']

shelveBooks = () => {
    myLibrary.forEach(item => {
        let shelfBook = document.createElement('div');
        shelfBook.className = `shelved-books ${bookWidths[Math.floor(Math.random()*bookWidths.length)]}`;
        shelfBook.style.backgroundColor = bookColors[myLibrary.indexOf(item)];
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
        
        // for (const key in item) {
        //     let bookInfo = document.createElement('div');
        //     bookInfo.className = `${key} book-spine`;
        //     bookInfo.style.backgroundColor = 'none';
        //     bookInfo.textContent = key;
        //     shelfBook.appendChild(bookInfo)
        // }
        //shelfBook.textContent = item.describeBook();
        libraryShelf.appendChild(shelfBook);
    })
    addStatusBtn();
    addRemoveBtn();
}

shelveBooks(myLibrary);

const newBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book-form');
const submitBtn = document.getElementById('submit-btn');

submitNewBook = () => {
    let newTitle = document.getElementById('title-input').value;
    let newAuthor = document.getElementById('author-input').value;
    let newLength = document.getElementById('length-input').value;
    let newStatus = document.getElementById('read-status').value;
    let newBook = new Book(newTitle, newAuthor, newLength, newStatus);
    addBookToLibrary(newBook);
    clearShelf();
    shelveBooks(myLibrary);
    console.log(myLibrary);
}

document.addEventListener('click', function(event) {
    if (event.target.matches('.remove-btn')) {
        myLibrary.splice(event.target.dataset.bookindex, 1);
        event.target.parentNode.remove();
    }
    if (event.target.matches('.status-btn')) {
        myLibrary[event.target.dataset.bookindex].readStatus === 'read' ? 
        myLibrary[event.target.dataset.bookindex].readStatus = 'not read' :
        myLibrary[event.target.dataset.bookindex].readStatus = 'read';
        event.target.textContent = myLibrary[event.target.dataset.bookindex].readStatus;
    }
    if (event.target.matches('#new-book-btn')) {
        newBookForm.classList.remove('hidden');
        submitBtn.classList.remove('hidden');
        newBookBtn.classList.add('hidden');
        libraryShelf.classList.add('hidden');
    }
    if (event.target.matches('#submit-btn')) {
        submitNewBook();
        newBookBtn.classList.remove('hidden');
        newBookForm.classList.add('hidden');
        submitBtn.classList.add('hidden');
        libraryShelf.classList.remove('hidden');
    }
},
false);
