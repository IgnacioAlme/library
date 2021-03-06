const btnAdd = document.getElementById('button-add');
const btnDel = document.getElementById('button-del');
const container = document.getElementById('container');
const cards = container.children;
const select = document.querySelector('select');
const html = document.querySelector('html');
const form = document.querySelector('form');
document.body.style.padding = '10px';

let myLibrary = []

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function refreshBooks() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
        container.textContent = '';
    }
}

function delAllBooks() {
    myLibrary = [];
    refreshBooks();
}

function showBooks() { 
    refreshBooks();
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
        let btnRead = document.createElement("button");
        card.appendChild(btnRead).className = "btnRead";
        let btnDel = document.createElement("button");
        card.appendChild(btnDel).className = "btnDel";

        name.textContent = `Title: ${myLibrary[i].name}`;
        author.textContent = `Author: ${myLibrary[i].author}`;
        pages.textContent = `Pages: ${myLibrary[i].pages}`;
        read.textContent = `${myLibrary[i].read}`;
        btnRead.textContent = "Read";
        btnDel.textContent = "Delete";
        
        btnRead.addEventListener('click', function(){
            myLibrary[i].read = "Read";
            refreshBooks();
            showBooks();
        })
        btnDel.addEventListener('click', function(){
            console.log(myLibrary[i], "deleted");
            myLibrary.splice(i, 1);
            refreshBooks();
            showBooks();
            console.table(myLibrary);
            
            return myLibrary;
        })

        container.appendChild(card).className = "card";
    }
}

function addBook() {
    let bName = form.elements['title'].value;
    let bAuthor = form.elements['author'].value;
    let bPages = form.elements['pages'].value;
    let bRead = form.elements['chooseone'].value;
    let bBook = new Book(bName, bAuthor, bPages, bRead);

    closeForm();
    addBookToLibrary(bBook);
    showBooks();
}
function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
    form.elements['title'].value = "";
    form.elements['author'].value = "";
    form.elements['pages'].value = null;
}

btnDel.addEventListener('click', delAllBooks);