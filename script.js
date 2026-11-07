const books = [
    {
        id: 1,
        title: "English Grammar",
        author: "Wren and Martin",
        category: "Education",
        image: "https://covers.openlibrary.org/b/title/English%20Grammar-M.jpg",
        pdf: "books/english-grammar.pdf"
    },
    {
        id: 2,
        title: "Computer Basics",
        author: "P.K. Sinha",
        category: "Technology",
        image: "https://covers.openlibrary.org/b/title/Computer%20Basics-M.jpg",
        pdf: "books/computer-basics.pdf"
    },
    {
        id: 3,
        title: "The Jungle Book",
        author: "Rudyard Kipling",
        category: "Story",
        image: "https://covers.openlibrary.org/b/title/The%20Jungle%20Book-M.jpg",
        pdf: "books/jungle-book.pdf"
    },
    {
        id: 4,
        title: "Basic Mathematics",
        author: "R.S. Aggarwal",
        category: "Education",
        image: "https://covers.openlibrary.org/b/title/Basic%20Mathematics-M.jpg",
        pdf: "books/mathematics.pdf"
    },
    {
        id: 5,
        title: "Learn HTML and CSS",
        author: "Jon Duckett",
        category: "Technology",
        image: "https://covers.openlibrary.org/b/title/HTML%20and%20CSS-M.jpg",
        pdf: "books/html-css.pdf"
    },
    {
        id: 6,
        title: "Short Stories",
        author: "Various Authors",
        category: "Story",
        image: "https://covers.openlibrary.org/b/title/Short%20Stories-M.jpg",
        pdf: "books/short-stories.pdf"
    }
];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "All";

function displayBooks() {

    if (!bookList || !searchInput) {
        console.error("Book list or search box not found in HTML.");
        return;
    }

    const searchText = searchInput.value.toLowerCase();

    const filteredBooks = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    bookList.innerHTML = "";

    if (filteredBooks.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>";
        return;
    }

    filteredBooks.forEach(book => {

        const card = document.createElement("div");
        card.className = "book-card";

        const image = document.createElement("img");
        image.src = book.image;
        image.alt = book.title + " cover";
        image.className = "book-image";

        image.onerror = function () {
            this.style.display = "none";
        };

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;

        const button = document.createElement("button");
        button.textContent = "View Book";

        button.addEventListener("click", function () {

            if (!book.pdf) {
                alert("PDF file is not connected.");
                return;
            }

            window.open(book.pdf, "_blank");
        });

        card.append(image, title, author, category, button);
        bookList.appendChild(card);
    });
}

// Search books
searchInput.addEventListener("input", displayBooks);

// Filter by category
categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        selectedCategory = this.dataset.category;

        displayBooks();
    });

});

// Display all books when page opens
displayBooks();
