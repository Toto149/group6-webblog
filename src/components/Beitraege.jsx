
import Beitrag from "./Beitrag";

import {useState} from "react";
import BeitragErstellenFormular from "./BeitragErstellenFormular";



export default function Beitraege({aktuellerBenutzer,
                                      beitraege,
                                      setBeitraege,
                                      kommentare,
                                      setKommentare,
                                  }){


    const [geklickt, setGeklickt] = useState(false);
    const [istAltZuNeu, setIstAltZuNeu] = useState(false);

    const compareDates = (b1, b2) => {
        let date1 = new Date(b1.erstellungsDatum).getTime();
        let date2 = new Date(b2.erstellungsDatum).getTime();

        if (date1 < date2) {
            return (istAltZuNeu ? -1 : 1)*1;
        } else if (date1 > date2) {
           return (istAltZuNeu ? -1 : 1)*-1;
        } else {
            return 0;
        }
    };
    const hantiereClick = () => {
        setGeklickt(!geklickt);
    }
    const hantiereClickAltZuNeu = () => {
        setIstAltZuNeu(!istAltZuNeu);
    };
    return(
        <div style={{backgroundColor: "lightblue", display: "flex", flexDirection:"column"}}>
            <div style={{textAlign: "right"}}>
                {aktuellerBenutzer &&  aktuellerBenutzer.rolle.kannBeitragVerfassen && <button onClick={hantiereClick}> ➕ Add Post</button>}
                <button onClick={hantiereClickAltZuNeu}> {istAltZuNeu ? "Neu zu Alt" : "Alt zu Neu"} </button>
            </div>

            {geklickt && <BeitragErstellenFormular beitraege={beitraege}
                                                   setBeitraege={setBeitraege}
                                                   aktuellerBenutzer={aktuellerBenutzer} />}

            {beitraege.sort(compareDates).map(beitrag =>
                                    <Beitrag key={beitrag.id}
                                             beitrag={beitrag}
                                             beitraege={beitraege}
                                             setBeitraege={setBeitraege}
                                             kommentare={kommentare}
                                             setKommentare={setKommentare}
                                             aktuellerBenutzer={aktuellerBenutzer}
                                                                                    />)
            }


        </div>
    );
}