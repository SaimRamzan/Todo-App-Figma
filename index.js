let showPass = document.getElementById('showPass')
// let password = document.getElementById('password')
// let inputEmail = document.getElementById('email').value
let loginButton = document.getElementById('loginButton')

showPass.addEventListener('click', ()=>{
    if (password.type === "password") {
        password.type = "text"
        showPass.style.color= "red";
    }else{
        password.type = "password"
        showPass.style.color= "Black";
    }
})

loginButton.addEventListener('click', ()=>{
        let inputEmail = document.getElementById('email').value.trim()
        let inputPassword = document.getElementById('password').value.trim()

        if (inputEmail === 'todo@to.com' && inputPassword === 'todo') {
            // alert('successful login');
            window.location.href ='loginAfter/sucessLogin.html'
        }else if(inputEmail !== 'todo@to.com' ){
            console.log('Email is not Correct');
            alert(`Not Valid Email ${inputEmail}`)
        }else if(inputPassword !== 'todo' ){
            console.log('password is not Correct');
            alert(`Not Valid Password ${inputPassword}`)
        }
})