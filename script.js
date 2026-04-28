const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTaskButton");
const erorrMsg = document.querySelector("#erorr-msg");
const ul = document.querySelector("ul"); 
const selectBox = document.querySelector(".select");
const tabs = document.querySelectorAll(".select .tab");
const tabAll = document.querySelector("#tabAll");
const tabDone = document.querySelector("#tabDone");
let tasks = [];


// addBtn.addEventListener("click", function () {
//   const task = input.value.trim();
//   if (task === "") {
//     erorrMsg.textContent = "Please Enter a Task";
//     return;
//   }
//   erorrMsg.textContent = "";

//   const taskObj = { text: task, completed: false };
//   tasks.push(taskObj);
//   saveTasks();

//   input.value = "";

//   // toggle checked
//   li.addEventListener("click", function () {
//     li.classList.toggle("checked");
//   });

//   // delete task
//   deleteBtn.addEventListener("click", function (e) {
//     e.stopPropagation();
//     li.classList.add("removing");
//     li.addEventListener("transitionend", () => {
//       li.remove();
//   }, { once: true });
// });
// });

addBtn.addEventListener("click", function () {
  const task = input.value.trim();

  if (task === "") {
    erorrMsg.textContent = "Please Enter a Task";
    return;
  }

  erorrMsg.textContent = "";

  const taskObj = { text: task, completed: false };
  tasks.push(taskObj);
  saveTasks();

  renderTask(taskObj);   // ✅ دي اللي كانت ناقصة

  input.value = "";
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addBtn.click();
  }
});
input.addEventListener("input", function () {
  erorrMsg.textContent = "";
});



// Move under line 
function moveUnderlineTo(tabEl) {
  const parentRect = selectBox.getBoundingClientRect();
  const tabRect = tabEl.getBoundingClientRect();

  const x = tabRect.left - parentRect.left + (tabRect.width / 2) - 30;
  const w = tabRect.width;

  selectBox.style.setProperty("--x", `${x}px`);
  // selectBox.style.setProperty("--w", `${w}px`);
}


// Set Active
function setActiveTab(tabEl) {
  tabs.forEach(t => t.classList.remove("active"));
  tabEl.classList.add("active");
  moveUnderlineTo(tabEl);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => setActiveTab(tab));
});

window.addEventListener("load", () => {
  const current = document.querySelector(".select .tab.active") || tabAll;
  setActiveTab(current);
});

window.addEventListener("resize", () => {
  const current = document.querySelector(".select .tab.active") || tabAll;
  moveUnderlineTo(current);
});

// Local Storage


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



function renderTask(taskObj) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskObj.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");

  li.append(span);
  li.append(deleteBtn);
  ul.append(li);

  if (taskObj.completed) {
    li.classList.add("checked");
  }

  li.addEventListener("click", function () {
    li.classList.toggle("checked");
    taskObj.completed = li.classList.contains("checked");
    saveTasks();
  });


  deleteBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  li.classList.add("removing"); 

  setTimeout(() => {
      tasks = tasks.filter(t => t !== taskObj);
      saveTasks();
      li.remove();
    }, 700);

  li.addEventListener("transitionend", () => {
    tasks = tasks.filter(t => t !== taskObj);
    saveTasks();
    li.remove();
  }, { once: true });});

window.addEventListener("DOMContentLoaded", function () {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    tasks.forEach(task => {
      renderTask(task);
    });
  }
});}
