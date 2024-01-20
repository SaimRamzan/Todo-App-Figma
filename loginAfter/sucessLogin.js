const form = document.getElementById('form')
const submit = document.getElementById('add')
const input= document.getElementById('input')
const inputMessage = document.getElementById('inputMessage')
const decription= document.getElementById('decription')
const inputDec = document.getElementById('inputDec')
const date= document.getElementById('date')
const inputdate = document.getElementById('inputdate')
const task = document.getElementById('incomleteTask')
const logout = document.getElementById('logout')
const loaction = document.querySelector('.loaction')
const skipButton = document.querySelector('.skipp')
const completeTask = document.getElementById('completeTask')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    formValidation()
})

const formValidation = ()=>{
    if (input.value === '' ) {
        inputMessage.innerHTML ='Input Filed Empty'
        inputMessage.style.color ='Red'
    }else if (decription.value === ''){
        inputDec.innerHTML ='Decription Empty'
        inputDec.style.color ='Red'
    }else if (date.value === ''){
        inputdate.innerHTML ='kindly added date'
        inputdate.style.color ='Red'
    }else{
        inputMessage.innerHTML = '';
        inputDec.innerHTML = '';
        inputdate.innerHTML = '';
        addData()
        add.setAttribute("data-dismiss","modal")
        add.click()
        closeModel()
    }
}
let closeModel = ()=>{
    add.setAttribute("data-dismiss","")
}

let data = []

let addData = ()=>{
    data.push({
        text :input.value,
        decription : decription.value,
        date: date.value,
    })
    localStorage.setItem("data", JSON.stringify(data))
    console.log('data',data);
    incompleteTask()
}
const incompleteTask = () => {
     task.innerHTML = "";
    data.map((a,b)=>{
    const updatedTask = document.createElement('div');
       updatedTask.innerHTML = `
       <div id=${b} class="incomleteTask" id="incomleteTask">
                        <input onclick="checkbox" class="checkbox" type="checkbox" name="checkbox" id="">
                        <h3>${a.text}</h3>
                        <h5>⏰ ${a.date}</h5>
        </div>
        `;
        reminder();
        updatedTask.style.marginBottom = "20px";
        task.appendChild(updatedTask);
        formReset();
        
    })
}

// console.log('data',data);

// const completedData = []
// const incompleteTaskDelete = ()=>{
//     // setInterval(()=>{
//         const localDate = new Date
//         const gethours = localDate.getHours()
//         const getMinutes = localDate.getMinutes()
//         const concatMinHours = `${gethours}:${getMinutes}`;
//         const filterData = data.filter(item => item.date === concatMinHours);
//         console.log('filterData',filterData);
//         completedData.push(filterData)
//         completeTask.innerHTML ='';
//     let completeDiv = document.createElement('div')
//     completeDiv.innerHTML=`
//          <div class="completeTask"  id="completeTask">
//             <input type="checkbox" checked name="checkbox" id="checkboxComplete">
//             <h3>${data.text}</h3>
//             </div>`
//             completeTask.appendChild(completeDiv)
// }
// console.log('completedData',completedData);


// const completedData = [];
// const incompleteTaskDelete = () => {
//     const localDate = new Date();
//     const gethours = localDate.getHours();
//     const getMinutes = localDate.getMinutes();
//     const concatMinHours = `${gethours}:${getMinutes}`;
    
//     // Assuming data is an array of objects with a 'date' property
//     const filterData = data.filter(item => item.date === concatMinHours);

//     console.log('filterData', filterData);

//     // Assuming completeTask is a DOM element
//     completeTask.innerHTML = '';

//     filterData.forEach(item => {
//         let completeDiv = document.createElement('div');
//         completeDiv.innerHTML = `
//             <div class="completeTask" id="completeTask">
//                 <input type="checkbox" checked name="checkbox" id="checkboxComplete">
//                 <h3>${item.text}</h3>
//             </div>`;
//         completeTask.appendChild(completeDiv);
//     });

//     completedData.push(filterData);
// };
// incompleteTaskDelete()
// console.log('completedData', completedData);



const formReset = ()=>{
    input.value = ''
    decription.value = ''
    date.value= ''
}
const checkbox = () => {
    const incompleteCheckBox = document.getElementById('checkbox').checked;
    if (incompleteCheckBox === true) {
        console.log('hello world');
    } else {
        console.log('hye');
    }
}
let clear ;
let reminderEnable = true ;


// array => incomplete
// => filter it according to reminderd tasks
// delete the same task
// let deleteItem = fpokdop

// newarray => completed []
// newarray.push()
    // push deleted item => deleteItem



const reminder =  ()=>{
    clear = setInterval(() => {
        if (reminderEnable) {
            const getDate = data.filter(item => item.date)
            const localDate = new Date
            const gethours = localDate.getHours()
            const getMinutes = localDate.getMinutes()
            const concatMinHours = `${gethours}:${getMinutes}`;
            getDate.filter(item => {
                const remminder = document.getElementById('main-header');
                        const headText = document.querySelector('.reminder');
                        const decription = document.getElementById('remindAbout');
                    if (item.date === concatMinHours) {
                        headText.innerText = item.text;
                        decription.innerText = item.decription;
                        remminder.style.display = 'block';  
                    }else{
                        remminder.style.display = 'none'
                    }
        
            })
        }
    }, 10000);
    
};


skipButton.addEventListener('click', () => {
    const remminder = document.getElementById('main-header')
    remminder.style.display = 'none'

    reminderEnable = false
    clearInterval(clear)

    setTimeout(()=>{
        reminderEnable = true
    },50000)
});

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || []
    incompleteTask()
})()

loaction.addEventListener('click',()=>{
    window.location.href ='loaction/loaction.html'
})
logout.addEventListener("click", ()=>{
    window.location.href = "../index.html"
})