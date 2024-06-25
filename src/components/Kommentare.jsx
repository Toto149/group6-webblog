import React from 'react';
import {beitrag} from '../Beitrag'
import Kommentar from "./Kommentar";
import KommentarErstellen from "./KommentarErstellen";

const Kommentare = (props) => {
    //props enthält ID vom Beitrag
    // oder useContext?

    //da Kommentare oldest first sein sollen, doch Kommentar erstellen am Ende

    //liest aus kommentare array im beitrag alle kommentare aus
    //ältester ganz oben, normalerweiße in order aber datum checken

    //(read more button und vorher nur 3 zeigen?)
    //auch wieder einklappbar


    //const beitragGewählt = beitrag.filter((beitrag)=> beitrag.id===props.id);

    return (
        <div>
            {beitrag.kommentare.map((kommentar)=><Kommentar key={kommentar.id} kommentar={kommentar}/>)}
            <KommentarErstellen beitragId={props.id}/>

        </div>
    );
};

export default Kommentare;