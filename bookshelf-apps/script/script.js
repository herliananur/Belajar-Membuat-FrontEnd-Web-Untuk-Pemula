document.addEventListener("DOMContentLoaded", function() {
    const inputBook = document.getElementById("inputBook");

    inputBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    const inputSearch = document.getElementById("searchBook");

    inputSearch.addEventListener("submit", function(event) {
        event.preventDefault();
        findBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refresDataFrombooks();
});