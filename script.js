const btnAdd = document.getElementById('button-add');
const btnDel = document.getElementById('button-del');
const container = document.getElementById('container');
const cards = container.children;

let myLibrary = [];


function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function delAllBooks() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
        container.textContent = '';
    }
}

function showBooks() { 
    delAllBooks();
    for(let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");

        let name = document.createElement("p");
        card.appendChild(name).className = "name";
        let author = document.createElement("p");
        card.appendChild(author).className = "author";
        let pages = document.createElement("p");
        card.appendChild(pages).className = "pages";
        let read = document.createElement("p");
        card.appendChild(read).className = "read";

        container.appendChild(card).className = "card";

        name.textContent = `Título: ${myLibrary[i].name}`
        author.textContent = `Autor: ${myLibrary[i].author}`
        pages.textContent = `Páginas: ${myLibrary[i].pages}`
        read.textContent = `Leído: ${myLibrary[i].read}`;
    }
}

function addBook() {
    let bName = prompt('Ingrese el título', 'Sin título');
    let bAuthor = prompt('Ingrese el autor', 'Sin autor');
    let bPages = prompt('Ingrese la cantidad de páginas', 0);
    let bRead = confirm('¿Lo ha leído?');

    let bBook = new Book(bName, bAuthor, bPages, bRead);
    addBookToLibrary(bBook);
    showBooks();
}

btnAdd.addEventListener('click', addBook);