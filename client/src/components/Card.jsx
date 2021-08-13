import React from 'react';

export default function Card({name, genre, image}){
return (
<div> 
    <h1>{name}</h1>
    <h3>{genre}</h3>
    <img src={image} alt="not found" width="200px" height="250px"/>
</div>
    )
}