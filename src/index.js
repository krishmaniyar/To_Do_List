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

var currentpro = '';

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

function deleteProject(name) {
    inbox.delete(name);
    resetpro();
}

const inbox = new Map();

newProject('home');
newProject('work');
newProject('fitness');

inbox.get('home').add("Organize Your Closet ","Sort clothes by season, donate those you no longer wear.","2025-09-27",true);
inbox.get('work').add("Organize Your Digital Workspace","Clean up your desktop, organize folders, and delete unnecessary files.","2025-09-27",false);
inbox.get('work').add("Set Clear Goals for the Week","Write down specific, measurable, and achievable goals for work.","2025-09-27",false);
inbox.get('work').add("Take an Online Course","Find a course related to your industry or a new skill you want to learn.","2025-09-27",false);
inbox.get('fitness').add("Full-Body Workout","Incorporate exercises like squats, push-ups, lunges, and planks to work multiple muscle groups.","2025-09-27",true);
inbox.get('fitness').add("Go for a Run or Jog ","If weather permits, go outside for a run or jog, or use a treadmill.","2025-09-27",false);

function makeleft() {
    const container = document.getElementById("left");
    container.innerHTML = '';
    document.getElementById('inbox').style.backgroundColor = 'yellow';
    document.getElementById('image').innerHTML = '';
    for(const [key] of inbox) {
        let newElement = document.createElement("div");
        container.appendChild(newElement).className = 'project';
        newElement.innerHTML += "<button id=" + key + "><img src='./365f3e7f182c9f913994.svg' alt='project'><h1>" + key + "</h1></button>";
        newElement.innerHTML += "<button class='option' id='delete" + key + "'><img src='./bde675c38d54979f589e.svg' alt='project'></button>";
        container.innerHTML += '<br>';
    }
    resetpro();
    document.getElementById('ProjectDetails').style.display = 'none';
    document.getElementById('mainleft').style.display = 'block';
    document.getElementById('important').style.backgroundColor = 'beige';
}

function makeright() {
    const container = document.getElementById('details');
    container.innerHTML = '';
    for(const [key] of inbox) {
        for(let i of inbox.get(key).project) {
            let newElement = document.createElement("div");
            container.appendChild(newElement).className = 'task';
            if(i['status']) {
                newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ","") + '" checked>';
                newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] +'</p>';
            }
            else {
                newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ","") + '" unchecked>';
                newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] +'</p>';
            }
            container.innerHTML += '<br>';
        }
    }
    currentpro = '';
    print(currentpro);
    document.getElementById('addtask').style.display = 'none';
    document.getElementById('taskDetails').style.display = 'none';
}

makeleft();
makeright();

document.getElementById('proadd').addEventListener("click",()=> {
    if(document.getElementById('ProjectDetails').style.display == 'block') {
        document.getElementById('ProjectDetails').style.display = 'none';
    }
    else {
        document.getElementById('ProjectDetails').style.display = 'block';
    }
});

document.getElementById('cancel').addEventListener("click",() =>{
    document.getElementById('ProjectDetails').style.display = 'none';
    document.getElementById('proName').value = '';
});

function visdash() {
    document.getElementById('dashboard').addEventListener("click",() =>{
        if(document.getElementById('mainleft').style.display == 'block') {
            document.getElementById('mainleft').style.display = 'none';
        }
        else if(document.getElementById('mainleft').style.display == 'none'){
            document.getElementById('mainleft').style.display = 'block';
        }
    });
}

function checkstatus() {
    for(const [key] of inbox) {
        for(let i of inbox.get(key).project) {
            document.getElementById('check' + i['title'].replaceAll(" ","")).addEventListener("change",() =>{
                if(i['status']) {
                    i['status'] = false;
                }
                else {
                    i['status'] = true;
                }
                print(i.title + i['status']);
                makeright();
            });
        }
    }
}

checkstatus();

visdash();

document.getElementById('getProject').addEventListener("click",() => {
    newProject(document.getElementById('proName').value);
    makeleft();
    print(inbox);
    document.getElementById('proName').value = '';
    clickpro();
});

document.getElementById('addtask').addEventListener("click",() => {
    if(document.getElementById('taskDetails').style.display == 'block') {
        document.getElementById('taskDetails').style.display = 'none';
    }
    else if(document.getElementById('taskDetails').style.display == 'none'){
        document.getElementById('taskDetails').style.display = 'block';
    }
});

document.getElementById('cancelTask').addEventListener("click",() => {
    document.getElementById('taskDetails').style.display = 'none';
});

document.getElementById('getTask').addEventListener("click",() =>{
    print( document.getElementById('title').value);
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var dueDate = document.getElementById('date').value;
    inbox.get(currentpro).add(title,description,dueDate,false);
    document.getElementById('date').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    makeright();
    print(inbox);
});

function resetpro() {
    for(const [key] of inbox) {
        document.getElementById('delete'+key).addEventListener("click",()=> {
            deleteProject(key)
            makeright();
            makeleft();
        });
    }
    clickpro();
}

function clickpro() {
    for(const [key] of inbox) {
        document.getElementById(key).addEventListener("click",() =>{
            const container = document.getElementById('details');
            container.innerHTML = '';
            for(let i of inbox.get(key).project) {
                let newElement = document.createElement("div");
                container.appendChild(newElement).className = 'task';
                if(i['status']) {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ","") + '" checked>';
                    newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] +'</p>';
                }
                else {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ","") + '" unchecked>';
                    newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] +'</p>';
                }
                container.innerHTML += '<br>';
            }
            makeleft();
            document.getElementById(key).style.backgroundColor = 'yellow';
            document.getElementById('delete'+key).style.backgroundColor = 'yellow';
            document.getElementById('inbox').style.backgroundColor = 'beige';
            document.getElementById('important').style.backgroundColor = 'beige';
            currentpro = key;
            print(currentpro);
            document.getElementById('addtask').style.display = 'block';
        });   
    }
}

resetpro();
clickpro();

document.getElementById('inbox').addEventListener("click",()=>{
    makeright();
    makeleft();
});

document.getElementById('important').addEventListener("click",()=>{
    const container = document.getElementById('details');
    container.innerHTML = '';
    for(const [key] of inbox) {
        for(let i of inbox.get(key).project) {
            if(i['priority']) {
                let newElement = document.createElement("div");
                container.appendChild(newElement).className = 'task';
                if(i['status']) {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ","") + '" checked>';
                    newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] +'</p>';
                }
                else {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ","") + '" unchecked>';
                    newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] +'</p>';
                }
                container.innerHTML += '<br>';
            }
        }
    }
    makeleft();
    document.getElementById('inbox').style.backgroundColor = 'beige';
    document.getElementById('important').style.backgroundColor = 'yellow';
    document.getElementById('taskDetails').style.display = 'none';
});

print(inbox);
// print(inbox.get('home').project[0]['title']);