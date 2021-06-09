const database = firebase.database();
const auth = firebase.auth();
const botonIniciarSesion = document.getElementById ("botonIniciarSesion");
const contraseña = document.getElementById("password");
const correo = document.getElementById("correo");

auth.onAuthStateChanged((user)=>{
if (user !== null){
window.location.href="index.html";
}
});
botonIniciarSesion.addEventListener("click",()=>{
    if(correo.value===""||contraseña.value===""){
        alert ("Por favor revisar los datos:3");
    return;

    } else {
auth.signInWithEmailAndPassword (correo.value, contraseña.value).then((data)=>{
window.location.href="index.html";
}).catch((error)=>{
    alert(error.message);
    return;
});
    }
});