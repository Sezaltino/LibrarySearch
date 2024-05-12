let item: any;
let book: Books[] = [];

function handleResponse(response: { items: any[] }) {
    for (let i = 0; i < response.items.length; i++) {
        const item = response.items[i];
        const authors = Array.isArray(item.volumeInfo.authors) ? item.volumeInfo.authors.join(', ') : 'Unknown';
        const newBook: Books = {
            Author: authors,
            AverageRating: item.volumeInfo.averageRating || 0,
            Categories: item.volumeInfo.categories || [],
            Description: item.volumeInfo.description || 'No description available',
            Links: item.volumeInfo.imageLinks || {},
            PageCount: item.volumeInfo.pageCount || 0,
            PublishedDate: item.volumeInfo.publishedDate || 'Unknown',
            RatingCount: item.volumeInfo.ratingCount || 0,
            Title: item.volumeInfo.title || 'Unknown'
        };

        book.push(newBook);
        displayBookCards(book);
    }

}

function createBookCard(book: Books): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('book-card');

    if (book.Links && book.Links.thumbnail) {
        div.style.backgroundImage = `url(${book.Links.thumbnail})`;
    } else {
        div.style.backgroundImage = 'url(default-thumbnail.jpg)';
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

    return div;
}

function displayBookCards(books: Books[]): void {
    const container = document.getElementById('bookContainer');
    books.forEach(book => {
        const card = createBookCard(book);
        container!.appendChild(card);
    });
}



