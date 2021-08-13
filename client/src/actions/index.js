import axios from "axios";

export function getVideogames(){
    return async function(dispatch){
        let json = axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}
