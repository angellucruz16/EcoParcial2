const database = firebase.database();
const auth = firebase.auth();
const peliculas = document.getElementById("peliculas");
const cerrarSesion = document.getElementById("cerrarSesion");
const botonVotar = document.getElementById ("votar");
let array = []; 
let llave ;

auth.onAuthStateChanged((user)=>{
    if(user!== null){
        llave=user.uid;
        database.ref("Parcial 2/yaVotaron/"+ user.uid).once("value",function(data){
            let usuario = data.val();
            if (usuario===null){
                llave=user.uid;

            } else {
                alert("Gracias por su votación! :) no puede votar más");
                botonVotar.style.display="none";
            }
        });
        
    } else {
        window.location.href= "login.html";
    }
});
cerrarSesion.addEventListener("click",()=>{
    auth.signOut().then(()=>{
     window.location.href = "login.html";
    });
});

database.ref("Parcial 2/peliculas").on("value",function(data){
peliculas.innerHTML="";
data.forEach((pelicula)=>{
let valor = pelicula.val();
let componente = new Componente (valor);
peliculas.appendChild(componente.render());
array.push(componente);
});
});
botonVotar.addEventListener("click",()=>{
for (let i = 0; i < array.length; i++) {
    
    
    if(array[0].voto==null||array[1].voto==null||array[2].voto==null||array[3].voto==null||array[4].voto==null||array[5].voto==null){
        
       alert("Tienes películas sin votacion")
        //array[i].voto=null;

        return;
    } else{ 
        console.log(array[i].voto);
        
    database.ref("Parcial 2/peliculas/"+array[i].pelicula.nombre).once("value", function (data){
            let pelicula = data.val();
            let total = pelicula.total;
            let promedio = pelicula.promedio;
            if (total== 0){
                let votoVotado = {
                    id: i,
                    nombre: array[i].pelicula.nombre,
                    promedio: array [i].voto,
                    total: 1
                }
            database.ref("Parcial 2/peliculas/"+votoVotado.nombre).set(votoVotado);
            return;
            }
            else {
                //Para pasarlas a decimales
                let totalNumero = parseInt (total,10);
                let promedioNumero = parseInt(promedio,10);
                let votoActual = parseInt (array[i].voto,10);
                console.log("votoActual: " + votoActual);
                
                let nuevoPromedio = (votoActual+(promedioNumero*totalNumero))/(totalNumero+1);
                console.log("nuevo promedio"+nuevoPromedio);
                
                console.log("Promedio numero "+promedioNumero);
                console.log("total numero "+totalNumero);
                console.log("nuevo promedio"+nuevoPromedio);

                let votoVotado = {
                    id: i,
                    nombre: array[i].pelicula.nombre,
                    promedio:nuevoPromedio,
                    total: totalNumero +1
                }
            database.ref("Parcial 2/peliculas/"+votoVotado.nombre).set(votoVotado);
            }
            
        });
        let usuarioYaVoto = {
            id: llave
        }
        database.ref ("Parcial 2/yaVotaron/"+usuarioYaVoto.id).set(usuarioYaVoto);
        if(i==5){
            alert("Gracias por Participar!!");
            
            return;
        }
        
    }
}
});