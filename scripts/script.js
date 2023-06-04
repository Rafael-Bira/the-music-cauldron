// Adds a comment on feedbacks.html
function addComment() {
    let getName = document.getElementById("name").value;
    let getPlace = document.getElementById("place").value;
    let getComment = document.getElementById("comment").value;
    const date = currentDate();
    let newComment = document.createElement("p");
    newComment.innerHTML = `<strong>${getName}</strong> <em>from</em> <strong>${getPlace}</strong> <em>said on</em> ${date}<br>&emsp;${getComment}`;
    document.getElementById("comments").appendChild(newComment);
}

// Gets the current date 
function currentDate() {
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    if(hours < 10) { hours = "0" + hours};
    let minutes = date.getMinutes();
    if(minutes < 10) { minutes = "0" + minutes};
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
}