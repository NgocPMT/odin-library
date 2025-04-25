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

function deleteBookFromLibrary(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
      break;
    }
  }
  renderBooks();
}

addBookToLibrary(
  crypto.randomUUID(),
  "Sherlock Holmes",
  "Conan Doyle",
  290,
  false
);
addBookToLibrary(crypto.randomUUID(), "Cats", "Uncle Bao", 1500, true);

const bookContainer = document.getElementById("book-container");

function renderBooks() {
  console.log(myLibrary);
  let books = myLibrary
    .map(
      (book) => `
      <div class="book-card">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <p class="book-pages">${book.pages} pages</p>
        <p class="book-status">${book.read ? "read" : "not read yet"}<p/>
        <button class="delete-book" data-uid=${book.id}>X</button>
      </div>
      `
    )
    .join("");

  bookContainer.innerHTML = books;

  const deleteBookButtons = document.querySelectorAll(".delete-book");

  deleteBookButtons.forEach((element) => {
    element.addEventListener("click", () =>
      deleteBookFromLibrary(element.dataset.uid)
    );
  });
}

renderBooks();

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
    <div class="book-card" data-uid=${newBook.id}>
      <h3 class="book-title">${newBook.title}</h3>
      <p class="book-author">${newBook.author}</p>
      <p class="book-pages">${newBook.pages} pages</p>
      <p class="book-status">${newBook.read ? "read" : "not read yet"}<p/>
    </div>
    `;

  addBookModal.close();
});
