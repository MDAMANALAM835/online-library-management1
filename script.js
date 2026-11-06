const books = [
    { id: 1, title: "English Grammar", author: "Wren and Martin", category: "Education" },
    { id: 2, title: "Computer Basics", author: "P.K. Sinha", category: "Technology" },
    { id: 3, title: "The Jungle Book", author: "Rudyard Kipling", category: "Story" },
    { id: 4, title: "Basic Mathematics", author: "R.S. Aggarwal", category: "Education" },
    { id: 5, title: "Learn HTML and CSS", author: "Jon Duckett", category: "Technology" },
    { id: 6, title: "Short Stories", author: "Various Authors", category: "Story" }
];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "All";

function displayBooks() {
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

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;

        const button = document.createElement("button");
        button.textContent = "View Book";

        button.addEventListener("click", () => {
            alert("Book selected: " + book.title +
                ". PDF download will be connected later.");
        });

        card.append(title, author, category, button);
        bookList.appendChild(card);
    });
}

searchInput.addEventListener("input", displayBooks);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;
        displayBooks();
    });
});

displayBooks();