const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTaskButton");
const erorrMsg = document.querySelector("#erorr-msg");
const ul = document.querySelector("ul"); 
const selectBox = document.querySelector(".select");
const tabs = document.querySelectorAll(".select .tab");
const tabAll = document.querySelector("#tabAll");
const tabDone = document.querySelector("#tabDone");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
  renderTask(taskObj);  
  input.value = "";
  tabAll.click();
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
}


// Set Active
function setActiveTab(tabEl) {
  tabs.forEach(t => t.classList.remove("active"));
  tabEl.classList.add("active");
  moveUnderlineTo(tabEl);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    setActiveTab(tab);
    filterTasks(tab.id); 
  });
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

  li.classList.add("task-enter");


  li.append(span);
  li.append(deleteBtn);
  ul.append(li);

  setTimeout(() => {
    li.classList.remove("task-enter");
  }, 400);

  if (taskObj.completed) {
    li.classList.add("checked");
  }

li.addEventListener("click", function () {
  li.classList.toggle("checked");
  const isChecked = li.classList.contains("checked");
  taskObj.completed = isChecked;
  saveTasks();

  const activeTabId = document.querySelector(".select .tab.active").id;

  filterTasks(activeTabId);
});


  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.classList.add("removing"); 

    setTimeout(() => {
      tasks = tasks.filter(t => t !== taskObj);
      saveTasks();
      li.remove();
    }, 700);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  tasks.forEach(task => {
    renderTask(task);
  });
  const activeTab = document.querySelector(".select .tab.active") || tabAll;
  filterTasks(activeTab.id);
});


function filterTasks(tabId) {
  const allLi = document.querySelectorAll("ul li");
  allLi.forEach(li => {
    const isChecked = li.classList.contains("checked");
    
    let shouldBeVisible = false;
    
    if (tabId === "tabAll") {
      shouldBeVisible = !isChecked; 
    } else if (tabId === "tabDone") {
      shouldBeVisible = isChecked;
    }
    const isCurrentlyVisible = !li.classList.contains("hidden");
    
    if (shouldBeVisible && !isCurrentlyVisible) {
      li.classList.remove("hidden"); 
      li.classList.add("task-enter"); 
      
      setTimeout(() => {
        li.classList.remove("task-enter"); 
      }, 400);
    } 
    else if (!shouldBeVisible && isCurrentlyVisible) {
      li.classList.add("removing"); 
      
      setTimeout(() => {
        li.classList.add("hidden"); 
        li.classList.remove("removing"); 
      }, 700); 
    }
  });
}