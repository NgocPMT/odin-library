const myLibrary = [];

function Book(id, title, author, pages) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(id, title, author, pages) {
  myLibrary.push(new Book(id, title, author, pages));
}

addBookToLibrary(crypto.randomUUID(), "Sherlock Holmes", "Conan Doyle", 290);
addBookToLibrary(crypto.randomUUID(), "Cats", "Uncle Bao", 1500);

console.log(myLibrary);

const bookContainer = document.getElementById("book-container");

let books = myLibrary
  .map(
    (book) => `
    <div class="book-card">
      <h3>Title: ${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Number of pages: ${book.pages}</p>
    </div>
    `
  )
  .join("");

bookContainer.innerHTML = books;
