let textarea = document.querySelector("textarea");
let titleInput = document.querySelector("#titleInput");
let addTaskButton = document.querySelector(".addTaskButton");
let modal = document.querySelector(".modal");
let form = document.querySelector("#form");
let section = document.querySelector(".board");
let TodoSection = document.querySelector("#toDo")
let progressSection = document.querySelector("#inProgress")
let doneSection = document.querySelector("#done")
let cancelbtn = document.querySelector(".cancelbtn")
let popup = document.querySelector(".popup");


let taskCard = null;


textarea.addEventListener("input", () => {

    // reset first so shrink works
    textarea.style.height = "auto";

    let scrollHeight = textarea.scrollHeight;
    let maxHeight = window.innerHeight * 0.5; // 50vh example

    if (scrollHeight < maxHeight) {
        textarea.style.height = scrollHeight + "px";
        textarea.style.overflowY = "hidden";
    } else {
        textarea.style.height = maxHeight + "px";
        textarea.style.overflowY = "auto";
    }
});

let board = JSON.parse(localStorage.getItem("board")) || {
    toDo: [],
    inProgress: [],
    done: []
}


function saveToLocal(){
    localStorage.setItem("board", JSON.stringify(board))
}

function removeFromLocal(){
    localStorage.removeItem("board")
}


function renderUi(){
    
    for(let key in board){
        let container = document.querySelector(`#${key}`);
        let techStack = container.querySelector(".Task-Stack");

        techStack.innerHTML = "";

        board[key].forEach(element => {
            
            let task = document.createElement("div");
            task.classList.add("Task");
            task.setAttribute(`draggable`, `true`);
            task.addEventListener("dragstart", (e) => {
                taskCard = task;
                taskCard.dataset.id = element.id;
            });


            let heading = document.createElement("h3")
            heading.classList.add("Task-Heading")
            heading.innerText = element.title;


            let desc = document.createElement("p")
            desc.classList.add("Task-Description");
            desc.innerText = element.description;

            let delBtn = document.createElement("button");
            delBtn.innerText = "Delete";
            delBtn.classList.add("deleteTaskButton");
            delBtn.addEventListener("click", function(dets){
                taskCard = task;
                taskCard.dataset.id = element.id;
                deleteTask()
                taskCard = null;
            })

            task.append(heading, desc, delBtn);

            techStack.appendChild(task);

        });
    }

    
    count();
}

function count(){
    for(let key in board){
        let container = document.querySelector(`#${key}`)
        let TaskHeader = container.querySelector(".Task-Header")
        let span = TaskHeader.querySelector("span")

        let containerLength = board[key].length;

        if(containerLength !== 0){
            span.textContent = containerLength;
        }

        else{
            span.textContent = "Count";
        }

    }
}

function deleteTask(){

    for (let key in board) {
        const index = board[key].findIndex(
            task => task.id === taskCard.dataset.id
        );

        if (index !== -1) {
            board[key].splice(index, 1);
            break;
        }
    }

    saveToLocal();
    renderUi();
    count();
    popupfnc("Task Deleted");

}

addTaskButton.addEventListener("click", function(){
    modal.classList.remove("hidden");
    
})

form.addEventListener("submit", function(dets){
    dets.preventDefault();

    let title  = titleInput.value;
    let description = textarea.value;

    let newTask = {
        id: crypto.randomUUID(),
        title,
        description
    }

    board.toDo.push(newTask);

    titleInput.value = "";
    textarea.value = "";
    textarea.style.height = "auto";
    textarea.style.overflowY = "hidden";

    modal.classList.add("hidden");

    saveToLocal();
    renderUi();
    popupfnc("Task Added");
})

renderUi();


function dropAndCatch(column){

    column.addEventListener("dragenter", function(dets){
        dets.preventDefault();
        column.classList.add("hover");
    })

    column.addEventListener("dragover", function(dets){
        dets.preventDefault();

    })

    column.addEventListener("drop", function(dets){
        dets.preventDefault();

        column.querySelector(".Task-Stack").appendChild(taskCard)
        column.classList.remove("hover");

        let columnName = column.id;

        for(let key in board){

            let taskIndex = board[key].findIndex(task => {
                return task.id === taskCard.dataset.id;
            });

            if(taskIndex !== -1){

                let movedTask = board[key][taskIndex];

                board[key].splice(taskIndex, 1);

                board[columnName].push(movedTask);

                break;
            }
        }
        
        taskCard = null;

        saveToLocal();

        count();

        if(columnName === "toDo"){
            columnName = "To-Do";
        }

        else if(columnName === "inProgress"){
            columnName = "In-Progress";
        }

        else if(columnName === "done"){
            columnName = "Done";
        }

        popupfnc("Task moved to " + columnName);
    })



    column.addEventListener("dragleave", function(dets){
        dets.preventDefault();

        column.classList.remove("hover");
    })

}
cancelbtn.addEventListener("click", function(dets){
    titleInput.value = "";
    textarea.value = "";
    textarea.style.height = "auto";
    textarea.style.overflowY = "hidden";

    modal.classList.add("hidden");

})

dropAndCatch(TodoSection);
dropAndCatch(progressSection);
dropAndCatch(doneSection);


function popupfnc(msg){

    popup.textContent = msg;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 1500);

}
