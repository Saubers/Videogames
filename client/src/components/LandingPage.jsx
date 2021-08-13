import React from 'react';
import {Link} from 'react-router-dom';
import styles from "./LandingPage.css";
import gameImg from '../images/videoGame.jpg'

export default function LandingPage(){
    return (
        <div>
            <h1>Bienvenidos a la pagina de Videogames</h1>
            <Link to = '/home'>
                <img className={styles.image} src={gameImg} alt="pageLogo"/>
                <button className={styles.button}>Home</button>
            </Link>
        </div>
    )
}