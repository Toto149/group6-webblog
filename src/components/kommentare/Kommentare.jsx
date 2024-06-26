import React from 'react';
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

    return (
        <div>
            {props.kommentare.filter(kommentar => kommentar.beitragsId === props.beitrag.id).sort((k1, k2) => {
                let datum1 = new Date(k1.datum).getTime();
                let datum2 = new Date(k2.datum).getTime();

                if (datum1 < datum2) {
                    return -1;
                } else if (datum1 > datum2) {
                    return 1;
                } else {
                    return 0;
                }
            }).map((kommentar) => <Kommentar key={kommentar.id} kommentar={kommentar} kommentare={props.kommentare} setKommentare={props.setKommentare}
                                             aktuellerBenutzer={props.aktuellerBenutzer}/>)}

            <KommentarErstellen beitrag={props.beitrag}
                                kommentare={props.kommentare}
                                setKommentare={props.setKommentare}
                                aktuellerBenutzer={props.aktuellerBenutzer}
                                wirdBearbeitet={false}
                                kommentar={null}/>

        </div>
    );
};

export default Kommentare;