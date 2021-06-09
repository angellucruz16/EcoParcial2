class Componente {
constructor (pelicula){
    this.pelicula=pelicula;
    this.voto ;
}
render = () =>{
    let componente = document.createElement ("div");
    componente.className = "ComponenteDiv";
    let contenedor = document.createElement ("div");
    contenedor.className = "contenedor" 
    let promedio = document.createElement("h2");
    promedio.className = "Promedio";
    database.ref ("Parcial 2/peliculas/"+this.pelicula.nombre).on("value",(data)=>{
        let pelicula = data.val(); 
        let promedioPelicula = parseFloat(pelicula.promedio); 
        if (promedioPelicula == 0) {
            promedio.innerHTML = "0.0";
        } else {
            promedio.innerHTML = promedioPelicula.toFixed(1);
        }
    });
    let nombrePelicula = document.createElement ("h1");
    nombrePelicula.className = "NombrePelicula";
    nombrePelicula.innerHTML=this.pelicula.nombre;
    let estrellas = document.createElement ("div");
    estrellas.className = "rate";
    for (let i = 5; i > 0; i--) {
       let estrella = document.createElement("input");
       estrella.type="radio";
       estrella.id = this.pelicula.nombre + "estrella" + i;
       estrella.name = "estrella"+ this.pelicula.nombre;
       estrella.value= i;
       let etiqueta = document.createElement("label");
    etiqueta.htmlFor =  this.pelicula.nombre + "estrella" + i;
    etiqueta.title = "text";
    etiqueta.innerHTML = i + " estrellas";
    estrella.addEventListener("click",()=>{
        this.voto =estrella.value;
        console.log(this.voto);

        
    });
    estrellas.appendChild (estrella);
    estrellas.appendChild (etiqueta);
}
    contenedor.appendChild (nombrePelicula);
    contenedor.appendChild (estrellas);
    componente.appendChild (contenedor);
    componente.appendChild (promedio);
    return componente;
}
}