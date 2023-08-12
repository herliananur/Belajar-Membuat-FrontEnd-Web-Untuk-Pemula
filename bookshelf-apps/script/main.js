const INCOMPLETE_BOOK = 'incompleteBookshelfList';
const COMPLETE_BOOK = 'completeBookshelfList';
const ITEMID_BOOK = 'itemId';

function addBook() {
    const incompleteBookshelfList = document.getElementById(COMPLETE_BOOK);
    const completeBookshelfList = document.getElementById(INCOMPLETE_BOOK);
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const completedBook = document.getElementById('inputBookIsComplete').checked;
    const book = makeBook(title, author, year, completedBook);
    const bookObject = generatebookObject(title, author, year, completedBook);

    book[ITEMID_BOOK] = bookObject.id;
    books.push(bookObject);

    if (completedBook == false) {
        completeBookshelfList.append(book);
    } else {
        incompleteBookshelfList.append(book);
    }
    updateDataToStorage();
}

function makeBook(title, author, year, completedBook) {
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('move')
    bookTitle.innerText = title;
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = author;
    const bookYear = document.createElement('p');
    bookYear.classList.add('year');
    bookYear.innerText = year;
    const bookIsComplete = completeButton();
    const bookRemove = removeButton();
    bookRemove.innerText = 'Hapus';
    const bookAction = document.createElement('div');
    bookAction.classList.add('action');
    if (completedBook == true) {
        bookIsComplete.innerText = 'Belum selesai dibaca';
    } else {
        bookIsComplete.innerText = 'Sudah Selesai Dibaca';
    }

    bookAction.append(bookIsComplete, bookRemove);
    const container = document.createElement('article');
    container.classList.add('bookItem');
    container.append(bookTitle, bookAuthor, bookYear, bookAction);

    return container;
};

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event) {
        eventListener(event);
    });
    return button;
};

function completeButton() {
    return createButton('done', function(event) {
        addBookComplete(event.target.parentElement.parentElement);
    });
};

function deleteBook(elementBook) {
    const position = findbookIndex(elementBook[ITEMID_BOOK]);
    if (window.confirm('Buku yang akan dihapus, tidak dapat dikembalikan. Apakah Anda ingin menghapusnya?')) {
        books.splice(position, 1);
        elementBook.remove();
    }
    updateDataToStorage();
};

function removeButton() {
    return createButton('remove', function(event) {
        deleteBook(event.target.parentElement.parentElement);
    });
};

function addBookComplete(elementBook) {
    const bookTitled = elementBook.querySelector('.bookItem>h3').innerText;
    const bookAuthored = elementBook.querySelector('.bookItem>p').innerText;
    const bookYeared = elementBook.querySelector('.year').innerText;
    const bookIsComplete = elementBook.querySelector('.done').innerText;

    if (bookIsComplete == 'Sudah Selesai Dibaca') {
        const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true)
        const book = findbook(elementBook[ITEMID_BOOK]);
        book.isCompleted = true;
        newBook[ITEMID_BOOK] = book.id;
        const incompleteBookshelfList = document.getElementById(COMPLETE_BOOK);
        incompleteBookshelfList.append(newBook);
    } else {
        const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false)
        const book = findbook(elementBook[ITEMID_BOOK]);
        book.isCompleted = false;
        newBook[ITEMID_BOOK] = book.id;
        const completeBookshelfList = document.getElementById(INCOMPLETE_BOOK);
        completeBookshelfList.append(newBook);
    }
    elementBook.remove();

    updateDataToStorage();
};

function findBook() {
    const searchBook = document.getElementById('searchBookTitle').value;
    const moveBook = document.querySelectorAll('.move')

    for (move of moveBook) {
        if (searchBook !== move.innerText) {
            console.log(move.innerText)
            move.parentElement.remove();
        }
    }
}

function refresDataFrombooks() {
    const uncompletedBook = document.getElementById(INCOMPLETE_BOOK);
    const completedBook = document.getElementById(COMPLETE_BOOK);

    for (book of books) {
        const newbook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newbook[ITEMID_BOOK] = book.id;

        if (book.isCompleted == false) {
            uncompletedBook.append(newbook);
        } else {
            completedBook.append(newbook);
        }
    }
}