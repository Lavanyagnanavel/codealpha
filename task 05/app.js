 const books = [];
const borrowingHistory = [];

function addBook() {
    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const categoryInput = document.getElementById('category').value;

    if (titleInput && authorInput && categoryInput) {
        const newBook = {
            id: books.length + 1,
            title: titleInput,
            author: authorInput,
            category: categoryInput,
            available: true,
        };

        books.push(newBook);
        displayBooks(books);

        // Clear input fields
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('category').value = '';

        alert(`Book "${newBook.title}" added to the library.`);
    } else {
        alert('Please fill in all the fields.');
    }
}

function searchBooks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput) ||
        book.category.toLowerCase().includes(searchInput)
    );
    displayBooks(filteredBooks);
}

function displayBooks(bookList) {
    const bookListContainer = document.getElementById('book-list');
    bookListContainer.innerHTML = '';

    bookList.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} - ${book.category} (${book.available ? 'Available' : 'Borrowed'})`;
        
        const borrowButton = document.createElement('button');
        borrowButton.textContent = book.available ? 'Borrow' : 'Return';
        borrowButton.addEventListener('click', () => handleBorrow(book));
        bookItem.appendChild(borrowButton);

        bookListContainer.appendChild(bookItem);
    });
}

function handleBorrow(book) {
    if (book.available) {
        const borrowDate = new Date().toLocaleDateString();
        borrowingHistory.push({ title: book.title, borrowDate });
        book.available = false;
        alert(`You have borrowed "${book.title}".`);
    } else {
        const returnDate = new Date().toLocaleDateString();
        const borrowedBook = borrowingHistory.find(item => item.title === book.title);
        borrowedBook.returnDate = returnDate;
        book.available = true;
        alert(`You have returned "${book.title}".`);
    }

    displayBooks(books);
    displayBorrowingHistory();
}

function displayBorrowingHistory() {
    const historyListContainer = document.getElementById('history-list');
    historyListContainer.innerHTML = '';

    borrowingHistory.forEach(history => {
        const historyItem = document.createElement('li');
        if (history.returnDate) {
            historyItem.textContent = `${history.title} - Borrowed on ${history.borrowDate}, Returned on ${history.returnDate}`;
        } else {
            historyItem.textContent = `${history.title} - Borrowed on ${history.borrowDate}`;
        }
        historyListContainer.appendChild(historyItem);
    });
}

// Sample usage
displayBooks(books);
displayBorrowingHistory();
