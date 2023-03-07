function Item(id, title, content, status) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
}

function getDataFromStorage(itemType) {
    return localStorage.getItem(itemType) ? JSON.parse(localStorage.getItem(itemType)) : [];
}

function loadFromJson() {
    // todo
}