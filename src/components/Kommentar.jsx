import React from 'react';
import KommentarBearbeitungsMenue from "./KommentarBearbeitungsMenue";

const Kommentar = (props) => {


    //menü unterschiedlich


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
                <p>Verfasst am: {props.kommentar.datum.toString()}</p>
                <KommentarBearbeitungsMenue/>
            </div>
            <p >{props.kommentar.inhalt}</p>
        </div>
    );
};

export default Kommentar;