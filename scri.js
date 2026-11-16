
let studies = JSON.parse(
    localStorage.getItem("studyTasks")
) || [];

let currentFilter = "all";

displayStudies();

// Add Study Task

function addStudy() {

    let subject = document.getElementById("subject").value.trim();

    let topic = document.getElementById("topic").value.trim();

    let date = document.getElementById("studyDate").value;

    if (subject === "" || topic === "" || date === "") {

        alert("Please fill all the fields!");

        return;
    }

    let study = {

        id: Date.now(),

        subject: subject,

        topic: topic,

        date: date,

        completed: false

    };

    studies.push(study);

    saveStudies();

    document.getElementById("subject").value = "";

    document.getElementById("topic").value = "";

    document.getElementById("studyDate").value = "";

    displayStudies();

}

// Display Study Tasks

function displayStudies() {

    let list = document.getElementById("studyList");

    let search = document.getElementById("search")
        .value.toLowerCase();

    list.innerHTML = "";

    let filtered = studies.filter(study => {

        let matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "completed" && study.completed) ||
            (currentFilter === "pending" && !study.completed);

        let matchesSearch =
            study.subject.toLowerCase().includes(search) ||
            study.topic.toLowerCase().includes(search);

        return matchesFilter && matchesSearch;

    });

    filtered.forEach(study => {

        let li = document.createElement("li");

        if (study.completed) {
            li.classList.add("completed");
        }

        let info = document.createElement("div");

        info.className = "study-info";

        let heading = document.createElement("strong");

        heading.textContent = study.subject;

        let topic = document.createElement("p");

        topic.textContent = study.topic;

        let date = document.createElement("small");

        date.textContent = "Date: " + study.date;

        info.appendChild(heading);

        info.appendChild(topic);

        info.appendChild(date);

        let actions = document.createElement("div");

        actions.className = "actions";

        let doneBtn = document.createElement("button");

        doneBtn.textContent = study.completed ? "Undo" : "Done";

        doneBtn.onclick = () => completeStudy(study.id);

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.className = "delete";

        deleteBtn.onclick = () => deleteStudy(study.id);

        actions.appendChild(doneBtn);

        actions.appendChild(deleteBtn);

        li.appendChild(info);

        li.appendChild(actions);

        list.appendChild(li);

    });

    updateProgress();

}

// Complete Study

function completeStudy(id) {

    studies = studies.map(study => {

        if (study.id === id) {

            study.completed = !study.completed;

        }

        return study;

    });

    saveStudies();

    displayStudies();

}

// Delete Study

function deleteStudy(id) {

    studies = studies.filter(study => study.id !== id);

    saveStudies();

    displayStudies();

}

// Filter Tasks

function setFilter(type) {

    currentFilter = type;

    displayStudies();

}

// Update Progress

function updateProgress() {

    let total = studies.length;

    let completed = studies.filter(
        study => study.completed
    ).length;

    let percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% Completed";

    document.getElementById("count").textContent =
        "Total Tasks: " + total +
        " | Completed: " + completed;

}

// Clear All Tasks

function clearStudies() {

    if (studies.length === 0) {
        alert("No study tasks available!");
        return;
    }

    if (confirm("Delete all study tasks?")) {

        studies = [];

        saveStudies();

        displayStudies();

    }

}

// Save Data

function saveStudies() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(studies)
    );

}
