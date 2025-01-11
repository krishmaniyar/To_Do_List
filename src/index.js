import "./styles.css";

function print(message) {
    console.log(message);
}

let no_of_task = [];

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = false;
    }
}

let index = 0;

class Project {
    constructor() {
        no_of_task[index] = 0;
        this.index = index++;
        this.project = new Array();
    }
    add(title, description, dueDate, priority, status) {
        this.project.push(new Task(title, description, dueDate, priority, status));
        no_of_task[this.index]++;
    }
}

function newProject(name) {
    const project = new Project();
    inbox.set(name,project);
}

const inbox = new Map();

newProject('home');
newProject('work');
newProject('fitness');

inbox.get('home').add("Organize Your Closet ","Sort clothes by season, donate those you no longer wear.","2025-09-27","Low");
inbox.get('work').add("Organize Your Digital Workspace","Clean up your desktop, organize folders, and delete unnecessary files.","2025-09-27","Low");
inbox.get('work').add("Set Clear Goals for the Week","Write down specific, measurable, and achievable goals for work.","2025-09-27","Low");
inbox.get('work').add("Take an Online Course","Find a course related to your industry or a new skill you want to learn.","2025-09-27","Low");
inbox.get('fitness').add("Full-Body Workout","Incorporate exercises like squats, push-ups, lunges, and planks to work multiple muscle groups.","2025-09-27","Low");
inbox.get('fitness').add("Go for a Run or Jog ","If weather permits, go outside for a run or jog, or use a treadmill.","2025-09-27","Low");

function makeleft() {
    const container = document.getElementById("left");
    container.innerHTML = '';
    document.getElementById('image').innerHTML = '';
    for(const [key] of inbox) {
        let newElement = document.createElement("div");
        container.appendChild(newElement).className = 'project';
        newElement.innerHTML += "<button id=" + key + "><img src='./365f3e7f182c9f913994.svg' alt='project'><h1>" + key + "</h1></button>";
    }
}

function makeright() {
    const container = document.getElementById('details');
    container.innerHTML = '';
    for(const [key] of inbox) {
        for(let i of inbox.get(key).project) {
            let newElement = document.createElement("div");
            container.appendChild(newElement).className = 'task';
            newElement.innerHTML = '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] +'</p>';
            container.innerHTML += '<br>';
        }
    }
}

makeleft();
makeright();

document.getElementById('proadd').addEventListener("click",() => {
    const name = prompt("Enter new project name:");
    newProject(name);
    makeleft();
    print(inbox);
});

document.getElementById('addtask').addEventListener("click",() => {
    const name = prompt("Enter new project name:");
    const title = prompt("Enter new task title:");
    const description = prompt("Enter new task description:");
    const dueDate = prompt("Enter new task due date:");
    const priority = prompt("Enter new task priority:");
    inbox.get(name).add(title,description,dueDate,priority);
    makeright();
    print(inbox);
});

for(const [key] of inbox) {
    document.getElementById(key).addEventListener("click",() =>{
        const container = document.getElementById('details');
        container.innerHTML = '';
        for(let i of inbox.get(key).project) {
            let newElement = document.createElement("div");
            container.appendChild(newElement).className = 'task';
            newElement.innerHTML = '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] +'</p>';
            container.innerHTML += '<br>';
        }
    });   
}

document.getElementById('inbox').addEventListener("click",()=>{
    makeright();
});

print(inbox);
// print(inbox.get('home').project[0]['title']);