import React, {useState} from 'react';
import KommentarMenue from "./KommentarMenue";
import KommentarErstellen from "./KommentarErstellen";
import datumKonvertieren from "../DatumKonvertieren";

const Kommentar = (props) => {

    const [wirdBearbeitet, setWirdBearbeitet] = useState(false);

    return (


        <>
            {wirdBearbeitet ?
                <KommentarErstellen kommentare={props.kommentare}
                                    setKommentare={props.setKommentare}
                                    aktuellerBenutzer={props.aktuellerBenutzer}
                                    wirdBearbeitet={wirdBearbeitet}
                                    setWirdBearbeitet={setWirdBearbeitet}
                                    kommentar={props.kommentar}/>
                :

                <div style={{
                    borderStyle: "solid",
                    padding: "10px",
                    margin: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    backgroundColor: "lightblue",
                    borderRadius: "10px"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <h3 style={{margin: "0"}}>{props.kommentar.nutzer.name}</h3>
                        <hr/>
                        <p style={{margin: "0"}}>{props.kommentar.inhalt}</p>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <p style={{margin: "0", marginRight: "10px"}}>
                            {props.kommentar.editDatum !== null
                                ? `Bearbeitet: ${datumKonvertieren(props.kommentar.editDatum)}`
                                : `Verfasst: ${datumKonvertieren(props.kommentar.datum)}`}
                        </p>
                        {props.aktuellerBenutzer !== null &&
                            (props.aktuellerBenutzer.rolle.kannKommentareLöschen || props.aktuellerBenutzer.id === props.kommentar.nutzer.id) &&
                            <KommentarMenue aktuellerBenutzer={props.aktuellerBenutzer}
                                            kommentar={props.kommentar}
                                            kommentare={props.kommentare}
                                            setKommentare={props.setKommentare}
                                            setWirdBearbeitet={setWirdBearbeitet}/>}
                    </div>
                </div>
            }
        </>
    );
};

export default Kommentar;