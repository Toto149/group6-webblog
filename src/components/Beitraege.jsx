
import Beitrag from "./Beitrag";

import {useState} from "react";
import BeitragErstellenFormular from "./BeitragErstellenFormular";
import PropTypes from "prop-types";


export default function Beitraege({aktuellerBenutzer, beitraege,setBeitraege,neu,setNeu,kommentare,setKommentare,kategorie,setKategorie,titel,setTitel,textInhalt,setTextInhalt}){


    const [geklickt, setGeklickt] = useState(false);




    const compareDates = (b1, b2) => {
        let date1 = new Date(b1.erstellungsDatum).getTime();
        let date2 = new Date(b2.erstellungsDatum).getTime();

        if (date1 < date2) {
            return (neu ? -1 : 1)*1;
        } else if (date1 > date2) {
           return (neu ? -1 : 1)*-1;
        } else {
            return 0;
        }
    };
    const hantiereClick = () => {
        setGeklickt(!geklickt);
    }
    const hantiereClickAltZuNeu = () => {
        setNeu(!neu);
    };
    return(
        <div style={{backgroundColor: "lightblue", display: "flex", flexDirection:"column"}}>
            <div style={{textAlign: "right"}}>
                {aktuellerBenutzer &&  aktuellerBenutzer.role.kannBeitragVerfassen && <button onClick={hantiereClick}> ➕ Add Post</button>}
                <button onClick={hantiereClickAltZuNeu}> {neu ? "Neu zu Alt" : "Alt zu Neu"} </button>
            </div>

            {geklickt && <BeitragErstellenFormular beitraege={beitraege}
                                                   setBeitraege={setBeitraege}
                                                   kommentare={kommentare}
                                                   setKommentare={setKommentare}
                                                   kategorie={kategorie}
                                                   setKategorie={setKategorie}
                                                   titel={titel} setTitel={setTitel}
                                                   textInhalt={textInhalt}
                                                   setTextInhalt={setTextInhalt}
                                                   aktuellerBenutzer={aktuellerBenutzer} />}
            {beitraege.sort(compareDates).map(beitrag => <Beitrag key={beitrag.id}
                                                                  beitrag={beitrag}
                                                                  beitraege={beitraege}
                                                                  setBeitraege={setBeitraege}
                                                                  kommentare={kommentare} />)}


        </div>
    );
}