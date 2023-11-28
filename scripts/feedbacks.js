// Gets the current date in 'MM/DD/YYYY, HH:MM' format
const currentDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    
    let hours = date.getHours();
    if (hours < 10) {hours = "0" + hours};
    
    let minutes = date.getMinutes();
    if (minutes < 10) {minutes = "0" + minutes};

    return `${month}/${day}/${year}, ${hours}:${minutes}`;
}

// Get data from the form
const getFormData = () => {
    const lastId = async () => {
        const response = await fetch("https://6510790e3ce5d181df5d4795.mockapi.io/api/comments");
        const data = await response.json();
        return data.length;
    }

    return {
        id: lastId(),
        name: document.querySelector("#name").value,
        place: document.querySelector("#place").value,
        date: currentDate(),
        text: document.querySelector("#comment-text").value
    };
}

// Comment Card
const commentCard = (comment) => {
    return `<p>${comment.id}. <strong>${comment.name}</strong> <em>from</em> <strong>${comment.place}</strong> <em>said on</em> ${comment.date}<br>&emsp;${comment.text}</p>`
}

// Load all the comments
const loadComments = async () => {
    const response = await fetch("https://6510790e3ce5d181df5d4795.mockapi.io/api/comments");
    const data = await response.json();
    for (let item of data) {
        document.querySelector("#comments").innerHTML += commentCard(item);
    };
}
loadComments();


// --- CRUD ---
// Create a new comment (POST)
const postComment = async () => {
    const newCommentData = getFormData();

    try {
        const response = await fetch("https://6510790e3ce5d181df5d4795.mockapi.io/api/comments", {
            method: "POST",
            headers: {"Content-type":"application/json;charset=UTF-8"},
            body: JSON.stringify(newCommentData)
        });
        
        document.querySelector("#comments").innerHTML += commentCard(newCommentData);
        console.info("COMMENT ADDED!");
    } catch(error) {
        console.error("COULDN'T ADD THE COMMENT - " + error);
    }
}

// Read a comment by ID (GET)
const getCommentById = async () => {
    let id = document.querySelector("#commentId").value;
    
    try {
        let response = await fetch(`https://6510790e3ce5d181df5d4795.mockapi.io/api/comments/${id}`);
        let data = await response.json();
        document.querySelector("#getComment").innerHTML = commentCard(data);
    } catch {
        console.error("ID NOT FOUND");
    }
}
getCommentById();

// Update a comment (PUT)
const editComment = async () => {
    let id = document.querySelector("#commentId").value;
    document.querySelector("#getComment").innerHTML = `
    <input placeholder="Edit name" id="editName"><br>
    <input placeholder="Edit place" id="editPlace"><br>
    <input placeholder="Edit text" id="editText"><br>
    <button onclick="catchNewData()">Cambiar</button>
    `;
}

const catchNewData = async () => {
    let id = document.querySelector("#commentId").value;
    let editedComment = {
        id: id,
        name: document.querySelector("#editName").value,
        place: document.querySelector("#editPlace").value,
        date: currentDate(),
        text: document.querySelector("#editText").value
    };
    
    try {
        const response = await fetch(`https://6510790e3ce5d181df5d4795.mockapi.io/api/comments/${id}`, {
            method: "PUT",
            headers: {"Content-type":"application/json;charset=UTF-8"},
            body: JSON.stringify(editedComment)
        });
        console.info("COMMENT UPDATED!");
    } catch(error) {
        console.error("AN ERROR HAS OCURRED - " + error);
    }
    
}

// Delete a comment (DELETE)
const deleteComment = async () => {
    let id = document.querySelector("#commentId").value;
    
    try {
        const response = await fetch(`https://6510790e3ce5d181df5d4795.mockapi.io/api/comments/${id}`, {method: "DELETE"});
        console.info("COMMENT REMOVED!");
    } catch(error) {
        console.error("COULDN'T REMOVE THE COMMENT - " + error);
    }
}