import React from 'react';
import KommentarBearbeitungsMenue from "./KommentarBearbeitungsMenue";

const Kommentar = (props) => {


    //3 punkte menü oben rechts? drop down
    //edit
    //delete funktion


    return (
        <div>
            {/*<div className={kommentarHeader}>*/}
            {/*    <h3 className={kommentarVerfasser}>{props.nutzer}</h3>*/}
            {/*    <p className={kommentarDatum}>Verfasst am: {props.datum}</p>*/}
            {/*    <KommentarBearbeitungsMenue/>*/}
            {/*</div>*/}
            {/*<p className={kommentarInhalt}>{props.inhalt}</p>*/}
            <div >
                <h3>{props.kommentar.nutzer.name}</h3>
                <p>Verfasst am: {props.datum}</p>
                <KommentarBearbeitungsMenue/>
            </div>
            <p >{props.inhalt}</p>
        </div>
    );
};

export default Kommentar;