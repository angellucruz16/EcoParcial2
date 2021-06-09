package com.example.cineco;

public class Pelicula {
    private String nombre;
    private Float promedio;
    private Float total, id;

    public Pelicula() {

    }

    public Pelicula(String nombre, Float id, Float promedio, Float total) {
        this.nombre = nombre;
        this.id = id;
        this.promedio = promedio;
        this.total = total;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getId() {
        return id;
    }

    public void setId(Float id) {
        this.id = id;
    }

    public Float getPromedio() {
        return promedio;
    }

    public void setPromedio(Float promedio) {
        this.promedio = promedio;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }
}
