package com.example.cineco;

import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.text.DecimalFormat;
import java.text.Format;
import java.util.ArrayList;

public class adaptadorPeliculas extends BaseAdapter {

    private ArrayList <Pelicula> puntuacionPeliculas;

    public adaptadorPeliculas() {
        puntuacionPeliculas = new ArrayList<>();
    }
    public void quitarElementosDeLista () {
        puntuacionPeliculas.clear();
        notifyDataSetChanged();
    }

    public void añadirElementosALista (Pelicula pelicula) {
        puntuacionPeliculas.add(pelicula);
        notifyDataSetChanged();
    }

    @Override
    public int getCount() {
        return puntuacionPeliculas.size();
    }

    @Override
    public Object getItem(int position) {
        return puntuacionPeliculas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int pos, View renglon, ViewGroup lista) {
        LayoutInflater inflater = LayoutInflater.from(lista.getContext());
        View view = inflater.inflate(R.layout.pelicula,null);
        Pelicula pelicula = puntuacionPeliculas.get(pos);
        TextView tituloPelicula = view.findViewById(R.id.nombrePelicula);
        TextView puntajePelicula = view.findViewById(R.id.puntajePelicula);
        tituloPelicula.setText(pelicula.getNombre());
        DecimalFormat format = new DecimalFormat("#.0");
        String puntajeFinal = String.valueOf(format.format(pelicula.getPromedio()));
        puntajePelicula.setText(puntajeFinal);
        return view;
    }
}
