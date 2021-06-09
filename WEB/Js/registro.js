const database = firebase.database();
const auth = firebase.auth();
const edad = document.getElementById ("edad");
const nombre = document.getElementById ("nombre");
const apellido = document.getElementById("apellido");
const contraseña = document.getElementById("password");
const repetirContraseña = document.getElementById("repassword");
const correo = document.getElementById("correo");
const botonRegistrarse = document.getElementById("registrarBoton");
var estaRegistrandose = false;
//para autenticar

auth.onAuthStateChanged((user)=>{
    if(user!==null){
        if(estaRegistrandose){
            //Así estamos creando objetos de manera rápida
            //Evitamos la creacion de una clase
            let nuevoUsuario = {
                id: user.uid,
                nombre: nombre.value, 
                apellido : apellido.value,
                edad : edad.value,
                correo : correo.value,
                //La contraseña nunca se guarda en la base de datos
            }
            //Llamamos a la rama donde se van a guardar los elementos
       database.ref("Parcial 2/usuarios/"+nuevoUsuario.id).set(nuevoUsuario).then(()=>{
           window.location.href="index.html";
       }); } else {
            window.location.href="index.html";
       } 
    
    }
});
botonRegistrarse.addEventListener("click",()=>{
let correoEstaVacio = correo.value;
let nombreEstaVacio = nombre.value;
let apellidoVacio = apellido.value;
let edadVacia = edad.value;
let contraseñaVacia = contraseña.value;
let repetirContraseñaVacia = repetirContraseña.value;
if (correoEstaVacio === "" ||nombreEstaVacio  === "" || apellidoVacio === "" || edadVacia === "" ||contraseñaVacia === "" ||repetirContraseñaVacia === "" ){
alert ("Por favor revisar los datos:3");
return;
} else if (contraseñaVacia !== repetirContraseñaVacia){
alert ("Por favor revisar contraseña");
return;
} else {
    //Creamos el usuario y verificamos con catch que el usuario este en la autenticacion
    estaRegistrandose = true;
    auth.createUserWithEmailAndPassword(correo.value, contraseña.value).catch((error)=>{
        alert (error.message);
        return;
    });
}
});