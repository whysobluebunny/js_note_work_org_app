function Item(id, title, content, status) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
}

function getDataFromStorage(itemType) {
    return localStorage.getItem(itemType) ? JSON.parse(localStorage.getItem(itemType)) : [];
}

function downloadFile(data, fileName) {
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob(
        [JSON.stringify(getDataFromStorage(data))],
        {type: "text/plain"}));
    a.download = fileName;
    a.click();
}

function uploadProjectData(downloadTo, callback = null) {
    let fileReader = new FileReader();

    let input = document.createElement("input");
    input.setAttribute("type", "file");

    input.addEventListener('change', (event) => {
        let files = event.target.files;
        let file = files[0];
        fileReader.readAsText(file);
        fileReader.addEventListener('load', () => {
            if (confirm("Upload from " + file.name + "?"))
            {
                let str = fileReader.result;
                if (JSON.parse(str)) {
                    localStorage.setItem(downloadTo, null);
                    if (typeof callback === "function")
                        callback();
                    localStorage.setItem(downloadTo, str);
                    if (typeof callback === "function")
                        callback();
                }
            }
        });
    });

    input.click();
}