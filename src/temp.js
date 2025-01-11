import "./styles.css";

function print(message) {
    console.log(message);
}

let no_of_task = 0;
let Item = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let no_of_home = 0;
let no_of_project = 0;
let no_of_work = 0;
let no_of_fitness = 0;

let Home = [];
let Work = [];
let Inbox = [];
let Fitness = [];

class Task {
    constructor(title, description, dueDate, priority, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }
}

class home {
    add(title, description, dueDate, priority, status) {
        Home.push(new Task(title, description, dueDate, priority, status));
        no_of_home++;
        Item[0]++;
    }
    delete(value) {
        if (value == 0)
            Home.splice(0, 1);
        else
            Home.splice(value, value);
        no_of_home--;
        Item[0]--;
    }
}

const home1 = new home();

class work {
    add(title, description, dueDate, priority, status) {
        Work.push(new Task(title, description, dueDate, priority, status));
        no_of_work++;
        Item[1]++;
    }
    delete(value) {
        if (value == 0)
            Work.splice(0, 1);
        else
        Work.splice(value, value);
        no_of_work--;
        Item[1]--;
    }
}

const work1 = new work();

class fitness {
    add(title, description, dueDate, priority, status) {
        Fitness.push(new Task(title, description, dueDate, priority, status));
        no_of_fitness++;
        Item[2]++;
    }
    delete(value) {
        if (value == 0)
            Fitness.splice(0, 1);
        else
        Fitness.splice(value, value);
        no_of_fitness--;
        Item[2]--;
    }
}

class Project {
    constructor(array) {
        this.array = array;
    }
}

const fitness1 = new fitness();

home1.add("home1","task1","2025-09-27","Low",true);
home1.add("home2","task1","2025-09-27","Medium",true);
work1.add("work1","task1","2025-09-27","Low",true);
work1.add("work2","task1","2025-09-27","Medium",true);
fitness1.add("fitness1","task1","2025-09-27","Low",true);
fitness1.add("fitness2","task1","2025-09-27","Medium",true);
fitness1.add("fitness3","task1","2025-09-27","Medium",true);

Inbox.push(Home);
no_of_project++;
Inbox.push(Work);
no_of_project++;
Inbox.push(Fitness);
no_of_project++;


// home1.delete(1);

no_of_task = no_of_fitness + no_of_home + no_of_work;

print("No of project " + no_of_project);
print("No of task " + no_of_task);
print(Inbox);
print("No of home " + no_of_home);
print(Home);
print("No of work " + no_of_work);
print(Work);
print("No of fitness " + no_of_fitness);
print(Fitness);
print(Item);

// import "./styles.css";

// function print(message) {
//     console.log(message);
// }

// let no_of_todo = 0;
// let value;
// let todolistArrayHome = [];
// let todolistArrayGym = [];
// let todolistArrayStudy = [];

// class Todolist {
//     constructor(title, description, dueDate, priority, status) {
//         this.title = title;
//         this.description = description;
//         this.dueDate = dueDate;
//         this.priority = priority;
//         this.status = status;
//     }
// }

// class home {
//     add(title, description, dueDate, priority, status) {
//         todolistArrayHome.push(new Todolist(title, description, dueDate, priority, status));
//         no_of_todo++;
//     }
//     delete(value) {
//         print("delete");
//         if (value == 0)
//             todolistArrayHome.splice(0, 1);
//         else
//         todolistArrayHome.splice(value, value);
//     }
// }

// class gym{
//     add(title, description, dueDate, priority, status) {
//         todolistArrayGym.push(new Todolist(title, description, dueDate, priority, status));
//         no_of_todo++;
//     }
//     delete(value) {
//         print("delete");
//         if (value == 0)
//             todolistArrayGym.splice(0, 1);
//         else
//         todolistArrayGym.splice(value, value);
//     }
// }

// class study{
//     add(title, description, dueDate, priority, status) {
//         todolistArrayStudy.push(new Todolist(title, description, dueDate, priority, status));
//         no_of_todo++;
//     }
//     delete(value) {
//         print("delete");
//         if (value == 0)
//             todolistArrayStudy.splice(0, 1);
//         else
//         todolistArrayStudy.splice(value, value);
//     }
// }
// const Home = new home();
// const Gym = new gym();
// const Study = new study();


// Home.add("Room Cleaning", "General", "2025-09-27", "High",true);
// Home.add("Room Cleaning", "General", "2025-09-27", "High",true);
// Gym.add("Walk", "Gym", "2025-09-27", "Medium",false);
// Gym.add("Walk", "Gym", "2025-09-27", "Medium",false);
// Study.add("Chapter 1", "Study", "2025-09-27", "Low",false);
// // Home.delete(0);


// print(todolistArrayHome);
// todolistArrayGym.push(todolistArrayHome);
// print(todolistArrayGym);
// print(todolistArrayStudy);

// // add(title, description, dueDate, priority, status) {
// //     Project.push(new Task(title, description, dueDate, priority, status));
// //     no_of_Project++;
// // }
// // delete(value) {
// //     print("delete");
// //     if (value == 0)
// //         Project.splice(0, 1);
// //     else
// //         Project.splice(value, value);
// //     no_of_Project--;
// // }

// // class inbox {
// //     add(title, description, dueDate, priority, status) {
// //         Inbox.push(new Task(title, description, dueDate, priority, status));
// //         no_of_task++;
// //     }
// //     delete(value) {
// //         if (value == 0)
// //             Inbox.splice(0, 1);
// //         else
// //             Inbox.splice(value, value);
// //         no_of_task--;
// //     }
// // }

// // const inbox1 = new inbox();