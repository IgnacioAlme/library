const btnAdd = document.getElementById('button-add');
const btnDel = document.getElementById('button-del');
const container = document.getElementById('container');
const cards = container.children;
const select = document.querySelector('select');
const html = document.querySelector('html');
document.body.style.padding = '10px';

function update(bgColor, textColor, bgCardsColor) {
    html.style.backgroundColor = bgColor;
    html.style.color = textColor;
}

select.onchange = function() {
    (select.value === 'black') ? update('black','white', 'darkslategray') : update('white','black','lightgreen');
}

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

        name.textContent = `Título: ${myLibrary[i].name}`;
        author.textContent = `Autor: ${myLibrary[i].author}`;
        pages.textContent = `Páginas: ${myLibrary[i].pages}`;
        read.textContent = `Leído: ${myLibrary[i].read}`;
        btnRead.textContent = "Leído";
        btnDel.textContent = "Eliminar";
        
        btnRead.addEventListener('click', function(){
            myLibrary[i].read = true;
            refreshBooks();
            showBooks();
        })
        btnDel.addEventListener('click', function(){
            console.log(myLibrary[i], "deleted");
            const index = myLibrary.indexOf(i)
            if (index > -1) {
                myLibrary.splice(index, 1);
            }
            refreshBooks();
            showBooks();
            console.table(myLibrary);
            
            return myLibrary;
        })

        container.appendChild(card).className = "card";
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
btnDel.addEventListener('click', delAllBooks);