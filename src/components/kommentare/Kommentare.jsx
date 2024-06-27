import React, {useState} from 'react';
import Kommentar from "./Kommentar";
import KommentarErstellen from "./KommentarErstellen";

const Kommentare = (props) => {
    const [wurdeGeklicked, setWurdeGeklicked ] = useState(false)

    const hantiereKlick = () => {
        setWurdeGeklicked(!wurdeGeklicked);
    }

    //(read more button und vorher nur 3 zeigen?)
    //auch wieder einklappbar
    const gefilterteKommentare = props.kommentare.filter(kommentar => kommentar.beitragsId === props.beitrag.id).sort((k1, k2) => {
        let datum1 = new Date(k1.datum).getTime();
        let datum2 = new Date(k2.datum).getTime();

        if (datum1 < datum2) {
            return -1;
        } else if (datum1 > datum2) {
            return 1;
        } else {
            return 0;
        }
    })

    return (
        <div>
            {wurdeGeklicked
                ? gefilterteKommentare.map((kommentar) => <Kommentar key={kommentar.id}
                                                                kommentar={kommentar}
                                                                kommentare={props.kommentare}
                                                                setKommentare={props.setKommentare}
                                                                aktuellerBenutzer={props.aktuellerBenutzer}/>)
                : gefilterteKommentare.slice(0, 3).map((kommentar) => <Kommentar key={kommentar.id}
                                                                      kommentar={kommentar}
                                                                      kommentare={props.kommentare}
                                                                      setKommentare={props.setKommentare}
                                                                      aktuellerBenutzer={props.aktuellerBenutzer}/>)}

            <KommentarErstellen beitrag={props.beitrag}
                                kommentare={props.kommentare}
                                setKommentare={props.setKommentare}
                                aktuellerBenutzer={props.aktuellerBenutzer}
                                wirdBearbeitet={false}
                                kommentar={null}/>

            {gefilterteKommentare.length > 3 &&
            <button onClick={hantiereKlick}>{wurdeGeklicked ? "Weniger Kommentare" : "Mehr Kommentare"}</button>}
        </div>
    );
};

export default Kommentare;