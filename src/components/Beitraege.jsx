
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
        <>
     
            <div className="container"  >
                <div className="section"    >
                    <div className="columns">
                        <div className="columns has-text-centered">
                            <h2
                                className="title"
                                style={{
                                    color: "ghostwhite",
                                    marginRight: "20em",
                            }}> Beiträge </h2>
                            <br />
                        </div>
                    </div>
                    <div style={{
                        textAlign: "right",
                        marginRight: "10em"
                    }}>
                    {aktuellerBenutzer
                        && aktuellerBenutzer.rolle.kannBeitragVerfassen
                        &&
                        <button
                            onClick={hantiereClick}
                                className="button is-info ml-2">{" Beitrag erstellen"}<i className="fa fa-save"></i>  </button>
                    }
                    <button
                        onClick={hantiereClickAltZuNeu}
                        className="button is-info ml-2"
                    >
                        {(istAltZuNeu ? "⬆️" : "⬇️")}
                    </button>



                    </div>
                    <div id="app"
                         className="row columns is-multiline is-centered"
                         >
                            <div className="column is-9">
                            {geklickt && <BeitragErstellenFormular beitraege={beitraege}
                                                               setBeitraege={setBeitraege}
                                                               aktuellerBenutzer={aktuellerBenutzer}/>}
                            </div>
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

                </div>
            </div>
        </>
    );
}