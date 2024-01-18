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
const skipButton = document.getElementById('skip')


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

        updatedTask.style.marginBottom = "20px";
       let getdatee = localStorage.getItem(date)
        // setInterval(() => {
        // const localTime = new Date()
        // const dateValue = date.value()
        // console.log('dateValue',dateValue);
        // const getH = localTime.getHours()
        // const getM = localTime.getMinutes()
        // const hoursPlusMin = `${getH}:${getM}`
        // if (a.data == hoursPlusMin) {
        //     console.log('hellow');
        // }
        // }, 1000);
        

        task.appendChild(updatedTask);
        formReset()
        
    })
}


// skipButton.addEventListener('click', ()=>{
//     const createElementForReminder = document.createElement('div')
    
//     createElementForReminder.innerHTML=`
//     <div id="remind" class="remind">
//       <div class="pWrapper">
//       <p class="reminder">Submit my resume</p>
//       <p id="remindAbout">Send my resume to DigitalTolk</p>
//     </div>
//       <img src="Image Source/Frame.png" alt="">
//       <div class="skip" id="skip">
//         <p id="skip">Skip</p>
//         <p id="remindLater">Remind me later</p>
        
//       </div>
//     </div>
//     `
//     document.body.appendChild(createElementForReminder);
//     setTimeout(() => {
//         createElementForReminder.remove();
// })

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




(()=>{
    data = JSON.parse(localStorage.getItem("data")) || []
    incompleteTask()
    console.log(data);
})()

loaction.addEventListener('click',()=>{
    window.location.href ='loaction/loaction.html'
})
logout.addEventListener("click", ()=>{
    window.location.href = "../index.html"
})
                 
            // const notifactionChrcker = () => setInterval(()=>{
            //     const dateValue = date.value
            //     console.log(dateValue);
            //     const getPcTime = new Date()
            //     const getH = getPcTime.getHours()
            //     const getM = getPcTime.getMinutes()
            //     console.log(getH,getM);

            // const inputDate = new Date(dateValue);

            // if (inputDate.getHours() == getH && inputDate.getMinutes() == getM) {
            //     console.log('helo')
            // } else {
            //     console.log(`can't same time`)    
            // }
            
            // } , 5000)
