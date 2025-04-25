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

Book.prototype.changeStatus = function () {
  this.read = !this.read;

  renderBooks();
};

function renderBooks() {
  const bookContainer = document.getElementById("book-container");
  console.log(myLibrary);
  let books = myLibrary
    .map(
      (book) => `
      <div class="book-card" data-uid=${book.id}>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <p class="book-pages">${book.pages} pages</p>
        <p class="book-status" style="color: ${
          book.read ? "green" : "black"
        }">${book.read ? "read" : "not read yet"}<p/>
        <button class="delete-book" data-uid=${
          book.id
        } aria-label="delete book" title="delete this book">X</button>
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

  const bookEls = document.querySelectorAll(".book-card");

  bookEls.forEach((bookEl) => {
    bookEl.addEventListener("click", () => {
      const uid = bookEl.dataset.uid;

      const changingBook = myLibrary.find((book) => book.id === uid);

      if (changingBook) {
        changingBook.changeStatus();
      }
    });
  });
}

// adding initial data for library
addBookToLibrary(
  crypto.randomUUID(),
  "Sherlock Holmes",
  "Author Conan Doyle",
  290,
  false
);
addBookToLibrary(
  crypto.randomUUID(),
  "War and Peace",
  "Leo Tolstoy",
  209,
  false
);
addBookToLibrary(crypto.randomUUID(), "Ulysses", "James Joyce", 144, true);
addBookToLibrary(crypto.randomUUID(), "Utopia", "Sir Thomas Moor", 289, true);
addBookToLibrary(crypto.randomUUID(), "Time Machine", "H.G Wells", 287, false);
addBookToLibrary(
  crypto.randomUUID(),
  "Romeo and Juliet",
  "William Shakespeare",
  359,
  false
);
addBookToLibrary(
  crypto.randomUUID(),
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  353,
  true
);

renderBooks();

const newBookButton = document.querySelector(".new-book-button");
const addBookModal = document.querySelector("#add-book-modal");
const modalCloseButton = document.querySelector(".modal-close-button");

newBookButton.addEventListener("click", () => addBookModal.showModal());
modalCloseButton.addEventListener("click", () => addBookModal.close());

const modalAddBookButton = document.querySelector(".modal-add-button");

modalAddBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookStatus = document.querySelector("#read").checked;

  addBookToLibrary(
    crypto.randomUUID(),
    bookTitle,
    bookAuthor,
    bookPages,
    bookStatus
  );

  renderBooks();

  addBookModal.close();
});
