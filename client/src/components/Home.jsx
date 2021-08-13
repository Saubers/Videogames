import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import { getVideogames } from '../actions/index';
import Card from './Card';

export default function Home(){

 const dispatch = useDispatch()
const allVideogames = useSelector ((state) => state?.videogames)

useEffect (() => {
    dispatch(getVideogames())
}) 

function handleClick(event){
    event.preventDefault();
    dispatch(getVideogames());
}

return (
<div>
    <Link to = '/videogame/create'>Crear videojuego</Link>
    <h1>Videogames page</h1>
    <button onClick={event => { handleClick(event) }}>
        Recargar los videojuegos
    </button>
    <div>
        <select>
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
        </select>
        <select>
            <option value="genre">Genero</option>
            <option value="videogames">Videjuego</option>
        </select>
 {
 allVideogames && allVideogames.map(el => {
   return <Card name={el.name} genre={el.genre} img={el.image} />
 })
 }
    </div>
</div>
)

}