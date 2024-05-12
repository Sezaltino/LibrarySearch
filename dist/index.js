"use strict";
let item;
let book = [];
function handleResponse(response) {
    for (let i = 0; i < response.items.length; i++) {
        const item = response.items[i];
        const authors = Array.isArray(item.volumeInfo.authors) ? item.volumeInfo.authors.join(', ') : 'Unknown'; // Verifica se os autores são uma matriz e os une em uma string separada por vírgulas, caso contrário, define como 'Unknown'
        const newBook = {
            Author: authors,
            AverageRating: item.volumeInfo.averageRating || 0, // Se a média de avaliações não estiver presente, defina como 0
            Categories: item.volumeInfo.categories || [], // Se as categorias não estiverem presentes, defina como uma matriz vazia
            Description: item.volumeInfo.description || 'No description available', // Se a descrição não estiver presente, defina como 'No description available'
            Links: item.volumeInfo.imageLinks || {}, // Se os links da imagem não estiverem presentes, defina como um objeto vazio
            PageCount: item.volumeInfo.pageCount || 0, // Se o número de páginas não estiver presente, defina como 0
            PublishedDate: item.volumeInfo.publishedDate || 'Unknown', // Se a data de publicação não estiver presente, defina como 'Unknown'
            RatingCount: item.volumeInfo.ratingCount || 0, // Se o número de avaliações não estiver presente, defina como 0
            Title: item.volumeInfo.title || 'Unknown' // Se o título não estiver presente, defina como 'Unknown'
        };
        book.push(newBook);
        displayBookCards(book);
        // Aqui você pode decidir o que deseja fazer com cada item, por exemplo, adicionar ao HTML
        // document.getElementById("content")!.innerHTML += "<br>" + item;    
    }
}
// Função para criar um elemento <li> com os detalhes do livro
function createBookCard(book) {
    const div = document.createElement('div');
    div.classList.add('book-card');
    // Usar a URL da imagem como background do card
    if (book.Links && book.Links.thumbnail) {
        div.style.backgroundImage = `url(${book.Links.thumbnail})`;
    }
    else {
        div.style.backgroundImage = 'url(default-thumbnail.jpg)'; // Imagem padrão, se a URL da imagem estiver ausente
    }
    const title = document.createElement('h2');
    title.textContent = book.Title;
    div.appendChild(title);
    const author = document.createElement('p');
    author.textContent = `Author: ${book.Author}`;
    div.appendChild(author);
    const description = document.createElement('p');
    description.textContent = `Description: ${book.Description}`;
    div.appendChild(description);
    // Adicione mais elementos conforme necessário para os outros detalhes do livro
    return div;
}
function displayBookCards(books) {
    const container = document.getElementById('bookContainer');
    books.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
}
