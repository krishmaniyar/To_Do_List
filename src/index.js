import "./styles.css";
import { isWithinInterval, addDays, startOfToday } from 'date-fns';

function isDateInNext7Days(dateToCheck) {
    const today = startOfToday();
    const next7Days = addDays(today, 7);
    print(today);
    print(dateToCheck);
    return isWithinInterval(dateToCheck, { start: today, end:  next7Days});
}

function isToday(dateToCheck) {
    const today = startOfToday();
    const next7Days = addDays(today, 1);
    print(today);
    print(dateToCheck);
    return isWithinInterval(dateToCheck, { start: today, end:  next7Days});
}

function handleFormSubmit(dateInput) {
    const userDate = new Date(dateInput);
    if (isDateInNext7Days(userDate)) {
        return true;
    } else {
        return false;
    }
}

function isTodayConfirm(dateInput) {
    const userDate = new Date(dateInput);
    if (isToday(userDate)) {
        return true;
    } else {
        return false;
    }
}


function print(message) {
    console.log(message);
}

let no_of_task = [];
let num = 0;

class Task {
    constructor(title, description, dueDate, priority, proindex) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = false;
        this.index = num;
        this.proindex = proindex;
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
        let proindex = no_of_task[this.index];
        no_of_task[this.index]++;
        print(no_of_task);
        this.project.push(new Task(title, description, dueDate, priority, proindex));
        num++;
    }
}

function newProject(name) {
    const project = new Project();
    inbox.set(name, project);
}

function deleteProject(name) {
    inbox.delete(name);
    resetpro();
}

const inbox = new Map();

newProject('home');
newProject('work');
newProject('fitness');

inbox.get('home').add("Organize Your Closet ", "Sort clothes by season, donate those you no longer wear.", "2025-09-09", true);
inbox.get('work').add("Organize Your Digital Workspace", "Clean up your desktop, organize folders, and delete unnecessary files.", "2025-12-23", false);
inbox.get('work').add("Set Clear Goals for the Week", "Write down specific, measurable, and achievable goals for work.", "2025-01-17", false);
inbox.get('work').add("Take an Online Course", "Find a course related to your industry or a new skill you want to learn.", "2025-02-20", false);
inbox.get('fitness').add("Full-Body Workout", "Incorporate exercises like squats, push-ups, lunges, and planks to work multiple muscle groups.", "2025-09-02", true);
inbox.get('fitness').add("Go for a Run or Jog ", "If weather permits, go outside for a run or jog, or use a treadmill.", "2025-01-14", false);

function makeleft() {
    const container = document.getElementById("left");
    container.innerHTML = '';
    document.getElementById('inbox').style.backgroundColor = 'yellow';
    document.getElementById('image').innerHTML = '';
    for (const [key] of inbox) {
        let newElement = document.createElement("div");
        container.appendChild(newElement).className = 'project';
        newElement.innerHTML += "<button id=" + key + "><img src='./365f3e7f182c9f913994.svg' alt='project'><h1>" + key + "</h1></button>";
        newElement.innerHTML += "<button class='option' id='delete" + key + "'><img src='./bde675c38d54979f589e.svg' alt='project'></button>";
        // container.innerHTML += '<br>';
    }
    resetpro();
    document.getElementById('ProjectDetails').style.display = 'none';
    document.getElementById('mainleft').style.display = 'block';
    document.getElementById('important').style.backgroundColor = 'beige';
}

function makeright() {
    const container = document.getElementById('details');
    container.innerHTML = '';
    for (const [key] of inbox) {
        container.innerHTML += '<h1>' + key + '</h1>';
        for (let i of inbox.get(key).project) {
            let newElement = document.createElement("div");
            container.appendChild(newElement).className = 'task';
            if (i['status']) {
                newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ", "") + '" checked>';
                newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] + '</p>';
            }
            else {
                newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ", "") + '" unchecked>';
                newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] + '</p>';
            }
            if(i['priority']) {
                newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='de7ced177d66bb006694.svg'></button></div>";
            }
            else {
                newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='c2e6e6dd118d33c26922.svg'></button></div>";
            }
            newElement.innerHTML += "<button id='delete" + i.index + "'><img src='bde675c38d54979f589e.svg'></button>";
            container.innerHTML += '<br>';
        }
    }
    currentpro = '';
    print(currentpro);
    document.getElementById('addtask').style.display = 'none';
    document.getElementById('taskDetails').style.display = 'none';
    document.getElementById('week').style.backgroundColor = 'beige';
    document.getElementById('today').style.backgroundColor = 'beige';
    checkstatus();
    deletetask();
    checkpriority();
}

makeleft();
makeright();

document.getElementById('proadd').addEventListener("click", () => {
    if (document.getElementById('ProjectDetails').style.display == 'block') {
        document.getElementById('ProjectDetails').style.display = 'none';
    }
    else {
        document.getElementById('ProjectDetails').style.display = 'block';
    }
});

document.getElementById('cancel').addEventListener("click", () => {
    document.getElementById('ProjectDetails').style.display = 'none';
    document.getElementById('proName').value = '';
});

function visdash() {
    document.getElementById('dashboard').addEventListener("click", () => {
        if (document.getElementById('mainleft').style.display == 'block') {
            document.getElementById('mainleft').style.display = 'none';
        }
        else if (document.getElementById('mainleft').style.display == 'none') {
            document.getElementById('mainleft').style.display = 'block';
        }
    });
}


visdash();

document.getElementById('getProject').addEventListener("click", () => {
    newProject(document.getElementById('proName').value.replaceAll(" ",""));
    makeleft();
    print(inbox);
    document.getElementById('proName').value = '';
    clickpro();
});

document.getElementById('addtask').addEventListener("click", () => {
    if (document.getElementById('taskDetails').style.display == 'block') {
        document.getElementById('taskDetails').style.display = 'none';
    }
    else if (document.getElementById('taskDetails').style.display == 'none') {
        document.getElementById('taskDetails').style.display = 'block';
    }
});

document.getElementById('cancelTask').addEventListener("click", () => {
    document.getElementById('taskDetails').style.display = 'none';
});

document.getElementById('getTask').addEventListener("click", () => {
    print(document.getElementById('title').value);
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var dueDate = document.getElementById('date').value;
    inbox.get(currentpro).add(title, description, dueDate, false);
    document.getElementById('date').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    makeright();
    print(inbox);
});

function resetpro() {
    for (const [key] of inbox) {
        document.getElementById('delete' + key).addEventListener("click", () => {
            deleteProject(key)
            makeright();
            makeleft();
        });
    }
    clickpro();
}

function clickpro() {
    for (const [key] of inbox) {
        document.getElementById(key).addEventListener("click", () => {
            const container = document.getElementById('details');
            container.innerHTML = '';
            for (let i of inbox.get(key).project) {
                let newElement = document.createElement("div");
                container.appendChild(newElement).className = 'task';
                if (i['status']) {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ", "") + '" checked>';
                    newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] + '</p>';
                }
                else {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.title.replaceAll(" ", "") + '" unchecked>';
                    newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] + '</p>';
                }
                if(i['priority']) {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='de7ced177d66bb006694.svg'></button></div>";
                }
                else {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='c2e6e6dd118d33c26922.svg'></button></div>";
                }
                newElement.innerHTML += "<button id='delete" + i.index + "'><img src='bde675c38d54979f589e.svg'></button>";
                container.innerHTML += '<br>';
            }
            makeleft();
            document.getElementById(key).style.backgroundColor = 'yellow';
            document.getElementById('delete' + key).style.backgroundColor = 'yellow';
            document.getElementById('inbox').style.backgroundColor = 'beige';
            document.getElementById('today').style.backgroundColor = 'beige';
            document.getElementById('week').style.backgroundColor = 'beige';
            document.getElementById('important').style.backgroundColor = 'beige';
            currentpro = key;
            print(currentpro);
            checkstatuspro(key);
            deletetaskpro(key);
            checkprioritypro(key);
            document.getElementById('addtask').style.display = 'block';
        });
    }
}

resetpro();
clickpro();

document.getElementById('inbox').addEventListener("click", () => {
    makeright();
    makeleft();
});

document.getElementById('important').addEventListener("click", ()=> {
    const container = document.getElementById('details');
    container.innerHTML = '';
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (i['priority']) {
                let newElement = document.createElement("div");
                container.appendChild(newElement).className = 'task';
                if (i['status']) {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.index + '" checked>';
                    newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] + '</p>';
                }
                else {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.index + '" unchecked>';
                    newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] + '</p>';
                }
                if(i['priority']) {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='de7ced177d66bb006694.svg'></button></div>";
                }
                else {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='c2e6e6dd118d33c26922.svg'></button></div>";
                }
                newElement.innerHTML += "<button id='delete" + i.index + "'><img src='bde675c38d54979f589e.svg'></button>";
                container.innerHTML += '<br>';
            }
        }
    }
    makeleft();
    deletetaskimp();
    checkstatusimp();
    checkpriorityimp();
    document.getElementById('inbox').style.backgroundColor = 'beige';
    document.getElementById('today').style.backgroundColor = 'beige';
    document.getElementById('week').style.backgroundColor = 'beige';
    document.getElementById('important').style.backgroundColor = 'yellow';
    document.getElementById('taskDetails').style.display = 'none';
    document.getElementById('addtask').style.display = 'none';
});

document.getElementById('week').addEventListener("click", () => {
    const container = document.getElementById('details');
    container.innerHTML = '';
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (handleFormSubmit(i.dueDate)) {
                let newElement = document.createElement("div");
                container.appendChild(newElement).className = 'task';
                if (i['status']) {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.index + '" checked>';
                    newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] + '</p>';
                }
                else {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.index + '" unchecked>';
                    newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] + '</p>';
                }
                if(i['priority']) {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='de7ced177d66bb006694.svg'></button></div>";
                }
                else {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='c2e6e6dd118d33c26922.svg'></button></div>";
                }
                newElement.innerHTML += "<button id='delete" + i.index + "'><img src='bde675c38d54979f589e.svg'></button>";
                container.innerHTML += '<br>';
            }
        }
    }
    makeleft();
    deletetaskweek();
    checkstatusweek();
    checkpriorityweek();
    document.getElementById('inbox').style.backgroundColor = 'beige';
    document.getElementById('week').style.backgroundColor = 'yellow';
    document.getElementById('today').style.backgroundColor = 'beige';
    document.getElementById('taskDetails').style.display = 'none';
    document.getElementById('addtask').style.display = 'none';
});

document.getElementById('today').addEventListener("click", () => {
    const container = document.getElementById('details');
    container.innerHTML = '';
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (isTodayConfirm(i.dueDate)) {
                let newElement = document.createElement("div");
                container.appendChild(newElement).className = 'task';
                if (i['status']) {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.index + '" checked>';
                    newElement.innerHTML += '<h1 id="complete">' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p id="complete">' + i['description'] + '</p>';
                }
                else {
                    newElement.innerHTML = '<input type="checkbox" id="check' + i.index + '" unchecked>';
                    newElement.innerHTML += '<h1>' + i['title'] + '</h1>' + '<h1>:</h1>' + '<p>' + i['description'] + '</p>';
                }
                if(i['priority']) {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='de7ced177d66bb006694.svg'></button></div>";
                }
                else {
                    newElement.innerHTML += "<div class='priority'><button id='priority" + i.index + "'><img src='c2e6e6dd118d33c26922.svg'></button></div>";
                }
                newElement.innerHTML += "<button id='delete" + i.index + "'><img src='bde675c38d54979f589e.svg'></button>";
                container.innerHTML += '<br>';
            }
        }
    }
    makeleft();
    deletetasktoday();
    checkstatustoday();
    checkprioritytoday();
    document.getElementById('inbox').style.backgroundColor = 'beige';
    document.getElementById('today').style.backgroundColor = 'yellow';
    document.getElementById('week').style.backgroundColor = 'beige';
    document.getElementById('taskDetails').style.display = 'none';
    document.getElementById('addtask').style.display = 'none';
});

print(inbox);
// print(inbox.get('home').project[0]['title']);

function checkstatus() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            document.getElementById('check' + i['title'].replaceAll(" ", "")).addEventListener("change", () => {
                if (i['status']) {
                    i['status'] = false;
                }
                else {
                    i['status'] = true;
                }
                print(i.title + i['status']);
                makeright();
                makeleft();
            });
        }
    }
}

function checkpriority() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            document.getElementById('priority' + i.index).addEventListener("click", () => {
                if (i['priority']) {
                    i['priority'] = false;
                }
                else {
                    i['priority'] = true;
                }
                makeright();
                makeleft();
            });
        }
    }
}

function checkstatusimp() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (i['priority']) {
                document.getElementById('check' + i.index).addEventListener("change", () => {
                    if (i['status']) {
                        i['status'] = false;
                    }
                    else {
                        i['status'] = true;
                    }
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function checkstatustoday() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (isTodayConfirm(i.dueDate)) {
                document.getElementById('check' + i.index).addEventListener("change", () => {
                    if (i['status']) {
                        i['status'] = false;
                    }
                    else {
                        i['status'] = true;
                    }
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function checkstatusweek() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (handleFormSubmit(i.dueDate)) {
                document.getElementById('check' + i.index).addEventListener("change", () => {
                    if (i['status']) {
                        i['status'] = false;
                    }
                    else {
                        i['status'] = true;
                    }
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function checkpriorityimp() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (i['priority']) {
                document.getElementById('priority' + i.index).addEventListener("click", () => {
                    if (i['priority']) {
                        i['priority'] = false;
                    }
                    else {
                        i['priority'] = true;
                    }
                    print(i.title + i['priority']);
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function checkprioritytoday() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (isTodayConfirm(i.dueDate)) {
                document.getElementById('priority' + i.index).addEventListener("click", () => {
                    if (i['priority']) {
                        i['priority'] = false;
                    }
                    else {
                        i['priority'] = true;
                    }
                    print(i.title + i['priority']);
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function checkpriorityweek() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (handleFormSubmit(i.dueDate)) {
                document.getElementById('priority' + i.index).addEventListener("click", () => {
                    if (i['priority']) {
                        i['priority'] = false;
                    }
                    else {
                        i['priority'] = true;
                    }
                    print(i.title + i['priority']);
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function checkstatuspro(name) {
    for (let i of inbox.get(name).project) {
        document.getElementById('check' + i['title'].replaceAll(" ", "")).addEventListener("change", () => {
            if (i['status']) {
                i['status'] = false;
            }
            else {
                i['status'] = true;
            }
            print(i.title + i['status']);
            makeright();
            makeleft();
        });
    }
}

function checkprioritypro(name) {
    for (let i of inbox.get(name).project) {
        document.getElementById('priority' + i.index).addEventListener("click", () => {
            if (i['priority']) {
                i['priority'] = false;
            }
            else {
                i['priority'] = true;
            }
            print(i.title + i['priority']);
            makeright();
            makeleft();
        });
    }
}

function deletetaskpro(key) {
    for (let i of inbox.get(key).project) {
        document.getElementById('delete' + i.index).addEventListener("click", () => {
            if (i['proindex'] == 0){
                inbox.get(key).project.splice(0, 1);
            }
            else{
                print(i.proindex);
                inbox.get(key).project.splice(i['proindex'], i['proindex']);
            }
            makeright();
            makeleft();
        });
    }
}

function resetproid(key,proindex) {
    for (let i of inbox.get(key).project) {
        if(i['proindex'] > proindex && i.proindex>0) {
            print('hi');
            print(i.proindex);
            i.proindex--;
        }
    }
}

function deletetask() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            document.getElementById('delete' + i.index).addEventListener("click", () => {
                if (i['proindex'] == 0)
                {
                    inbox.get(key).project.splice(0, 1);
                    resetproid(key,i.proindex);
                }
                else{
                    inbox.get(key).project.splice(i['proindex'],i['proindex']);
                    resetproid(key,i.proindex)
                }
                makeleft();
                makeright();
            });
        }
    }
}

function deletetaskimp() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (i['priority']) {
                document.getElementById('delete' + i['index']).addEventListener("click", () => {
                    if (i['proindex'] == 0)
                        {
                            inbox.get(key).project.splice(0, 1);
                            resetproid(key,i.proindex);
                        }
                        else{
                            inbox.get(key).project.splice(i['proindex'],i['proindex']);
                            resetproid(key,i.proindex)
                        }
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function deletetasktoday() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (isTodayConfirm(i.dueDate)) {
                document.getElementById('delete' + i['index']).addEventListener("click", () => {
                    if (i['proindex'] == 0)
                    {
                        inbox.get(key).project.splice(0, 1);
                        resetproid(key,i.proindex);
                    }
                    else{
                        inbox.get(key).project.splice(i['proindex'],i['proindex']);
                        resetproid(key,i.proindex)
                    }
                    print(i['index']);
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

function deletetaskweek() {
    for (const [key] of inbox) {
        for (let i of inbox.get(key).project) {
            if (handleFormSubmit(i.dueDate)) {
                document.getElementById('delete' + i['index']).addEventListener("click", () => {
                    if (i['proindex'] == 0)
                    {
                        inbox.get(key).project.splice(0, 1);
                        resetproid(key,i.proindex);
                    }
                    else{
                        inbox.get(key).project.splice(i['proindex'],i['proindex']);
                        resetproid(key,i.proindex)
                    }
                    print(i['index']);
                    makeright();
                    makeleft();
                });
            }
        }
    }
}

print(inbox);