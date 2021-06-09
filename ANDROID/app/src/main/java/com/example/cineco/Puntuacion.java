package com.example.cineco;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class Puntuacion extends AppCompatActivity implements View.OnClickListener {
    private Button botonSalir;
    private ListView listaPuntaje;
    private adaptadorPeliculas peliculasAdaptadas;
    private FirebaseDatabase db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_puntuacion);
        botonSalir = findViewById(R.id.botonSalir);
        botonSalir.setOnClickListener(this);
        listaPuntaje = findViewById(R.id.listaPuntaje);
        peliculasAdaptadas = new adaptadorPeliculas();
        listaPuntaje.setAdapter(peliculasAdaptadas);
        db = FirebaseDatabase.getInstance();
        cargarBaseDatos ();
    }

    private void cargarBaseDatos() {
        DatabaseReference referencia = db.getReference().child("Parcial 2").child("peliculas");
        referencia.addValueEventListener(( new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot data) {
                peliculasAdaptadas.quitarElementosDeLista();
                for (DataSnapshot child: data.getChildren()){
                    Pelicula pelicula = child.getValue(Pelicula.class);
                    peliculasAdaptadas.añadirElementosALista(pelicula);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        }));
    }

    @Override
    public void onClick(View v) {
        finish();
    }

}