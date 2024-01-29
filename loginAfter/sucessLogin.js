const form = document.getElementById("form");
const submit = document.getElementById("add");
const input = document.getElementById("input");
const inputMessage = document.getElementById("inputMessage");
const decription = document.getElementById("decription");
const inputDec = document.getElementById("inputDec");
const date = document.getElementById("date");
const inputdate = document.getElementById("inputdate");
const task = document.getElementById("incomleteTask");
const logout = document.getElementById("logout");
const loaction = document.querySelector(".loaction");
const skipButton = document.querySelector(".skipp");
const teskActive = document.querySelector(".task");
const notask = document.getElementById("notask");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  if (input.value === "") {
    inputMessage.innerHTML = "Input Filed Empty";
    inputMessage.style.color = "Red";
  } else if (decription.value === "") {
    inputDec.innerHTML = "Decription Empty";
    inputDec.style.color = "Red";
  } else if (date.value === "") {
    inputdate.innerHTML = "kindly added date";
    inputdate.style.color = "Red";
  } else {
    inputMessage.innerHTML = "";
    inputDec.innerHTML = "";
    inputdate.innerHTML = "";
    addData();
    add.setAttribute("data-dismiss", "modal");
    add.click();
    closeModel();
  }
};
let closeModel = () => {
  add.setAttribute("data-dismiss", "");
};


let data = [];

let addData = () => {
  data.push({
    text: input.value,
    decription: decription.value,
    date: date.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  console.log("data", data);
  incompleteTask();
  formReset();
};


const incompleteTask = () => {
  task.innerHTML = "";
  data.map((a, b) => {
    const updatedTask = document.createElement("div");
    updatedTask.innerHTML = `<div id=${b} class="task" id="incomleteTask">
          <label class="custom-checkbox-wrapper"  id="checkboxInComplete" for="custom-checkbox">
            <input  class="checkbox" type="checkbox" onclick = " 
              complete('${a.text}','${b}')"  name="checkbox" id="custom-checkbox">
            <span class="checkbox"></span>
          </label>
          <div class="content">
            <h3>${a.text}</h3>
            <h5>⏰ ${a.date}</h5>
          </div>
        </div>`;
    reminder();
    incompleteTaskDelete(a, b);
    updatedTask.style.marginBottom = "20px";
    task.appendChild(updatedTask);
    formReset();
  });
};



const completeTest = document.getElementById("completetest");
const data1 = JSON.parse(localStorage.getItem("completedData"))
console.log("data1", data1);
let showCompleteData = () => {
  data1?.map(item => {
    let completeDiv = document.createElement("div");
    notask.innerHTML = "";
    completeDiv.innerHTML = `
          <div class="completeTask"  id="completeTask">
            <label class="custom-checkbox-wrapper" id="checkboxCompletee" for="custom-checkbox">
              <input type="checkbox" checked name="checkbox" id="checkboxComplete">
              <span class="checkbox"></span>
            </label>
            <h3>${item.text}</h3>
          </div>`
    completeTest.appendChild(completeDiv);
  })

}
const join = JSON.parse(localStorage.getItem('completedData'))

function complete(b) {
  const complete = data?.splice(b, 1);
  const joindata = complete.concat(join)
  localStorage.setItem("data", JSON.stringify(data));
  if (join === null) {
    localStorage.setItem("completedData", JSON.stringify(complete));
  } else {
    localStorage.setItem("completedData", JSON.stringify(joindata));

  }
  incompleteTask()
  // showCompleteData()
}


showCompleteData()




const formReset = () => {
  input.value = "";
  decription.value = "";
  date.value = "";
};

let clear;
let reminderEnable = true;

const reminder = () => {
  clear = setInterval(() => {
    if (reminderEnable) {
      const getDate = data.filter((item) => item.date);
      const localDate = new Date();
      const gethours = localDate.getHours();
      const getMinutes = localDate.getMinutes();
      const concatMinHours = `${gethours}:${getMinutes}`;
      getDate.map((item) => {
        const remminder = document.getElementById("main-header");
        const headText = document.querySelector(".reminder");
        const decription = document.getElementById("remindAbout");
        if (item.date === concatMinHours) {
          headText.innerText = item.text;
          decription.innerText = item.decription;
          remminder.style.display = "block";
          complete()
          // showCompleteData()
        } else {
          remminder.style.display = "none";
        }
      });
    }
  }, 1000);
};

skipButton.addEventListener("click", () => {
  const remminder = document.getElementById("main-header");
  remminder.style.display = "none";

  reminderEnable = false;
  clearInterval(clear);

  setTimeout(() => {
    reminderEnable = true;
  }, 50000);
});

const remindLater = document.getElementById('remindLater')
remindLater.addEventListener('click', () => {
  const remminder = document.getElementById("main-header");
  remminder.style.display = "none";

  reminderEnable = false;
  clearInterval(clear);

  setTimeout(() => {
    reminderEnable = true;
  }, 20000);
})

let completedData = [];

const incompleteTaskDelete = (taskData, index) => {
  let checkAndComplete = () => {
    const completeTask = document.getElementById("completeTaskk");
    const localDate = new Date();
    const gethours = localDate.getHours();
    const getMinutes = localDate.getMinutes();
    const concatMinHours = `${gethours}:${getMinutes}`;
    const filterData = data.filter(
      (item) => item.date === concatMinHours && item.text === taskData.text
    );
    completeTask.innerHTML = "";
    console.log("filterData", filterData);
    filterData.forEach((item) => {
      notask.innerHTML = "";
      let completeDiv = document.createElement("div");
      completeDiv.innerHTML = `
              <div class="completeTask"  id="completeTask">
                <label class="custom-checkbox-wrapper" id="checkboxCompletee" for="custom-checkbox">
                  <input type="checkbox" checked name="checkbox" id="checkboxComplete">
                  <span class="checkbox"></span>
                </label>
                <h3>${item.text}</h3>
              </div>`;
      completeTask.appendChild(completeDiv);
      completedData.push(...filterData);
    });


  };
  checkAndComplete();
};



let active = () => {
  if (teskActive == true) {
    teskActive.style.backgroundColor = "white";
  } else {
    teskActive.style.backgroundColor = "black";
    teskActive.style.color = "white";
  }
};
active();

(() => {
  completedData = JSON.parse(localStorage.getItem("completedData")) || [];
  // incompleteTaskDelete();
})();


(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  incompleteTask();
})();

loaction.addEventListener("click", () => {
  window.location.href = "loaction/loaction.html";
});
logout.addEventListener("click", () => {
  window.location.href = "../index.html";
});
