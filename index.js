const myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(id, title, author, pages, read) {
  myLibrary.push(new Book(id, title, author, pages, read));
}

addBookToLibrary(
  crypto.randomUUID(),
  "Sherlock Holmes",
  "Conan Doyle",
  290,
  false
);
addBookToLibrary(crypto.randomUUID(), "Cats", "Uncle Bao", 1500, true);

console.log(myLibrary);

const bookContainer = document.getElementById("book-container");

let books = myLibrary
  .map(
    (book) => `
    <div class="book-card">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">${book.author}</p>
      <p class="book-pages">${book.pages} pages</p>
      <p class="book-status">${book.read ? "read" : "not read yet"}<p/>
    </div>
    `
  )
  .join("");

bookContainer.innerHTML = books;

const newBookButton = document.querySelector(".new-book-button");
const addBookModal = document.querySelector("#add-book-modal");
const modalCloseButton = document.querySelector(".modal-close-button");

newBookButton.addEventListener("click", () => addBookModal.showModal());
modalCloseButton.addEventListener("click", () => addBookModal.close());

const modalAddBookButton = document.querySelector(".modal-add-button");
const bookTitleEL = document.querySelector("#title");
const bookAuthorEL = document.querySelector("#author");
const bookPagesEl = document.querySelector("#pages");
const bookStatusEL = document.querySelector("#read");

modalAddBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  const bookTitle = bookTitleEL.value;
  const bookAuthor = bookAuthorEL.value;
  const bookPages = bookPagesEl.value;
  const bookStatus = bookStatusEL.checked;

  addBookToLibrary(
    crypto.randomUUID(),
    bookTitle,
    bookAuthor,
    bookPages,
    bookStatus
  );

  const newBook = myLibrary[myLibrary.length - 1];
  bookContainer.innerHTML += `
    <div class="book-card">
      <h3 class="book-title">${newBook.title}</h3>
      <p class="book-author">${newBook.author}</p>
      <p class="book-pages">${newBook.pages} pages</p>
      <p class="book-status">${newBook.read ? "read" : "not read yet"}<p/>
    </div>
    `;

  addBookModal.close();
});
