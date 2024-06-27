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

                <div className="card large mb-2" style={{minHeight: '150px'}}>
                    <div className="card-content">
                        <div className="media is-justify-content-space-between is-align-items-center">
                            <div className="media-left is-flex is-align-items-center">
                                <figure className="image is-48x48 mr-2">
                                    <img src={props.kommentar.nutzer.avatar} alt="Profilbild"/>
                                </figure>
                                <div className="media-content">
                                    <p className="is-size-4 no-padding is-break-word">{props.kommentar.nutzer.name}</p>
                                </div>
                            </div>
                            <div className="media-right is-flex is-align-items-center field is-grouped">
                                <div className="level is-flex is-align-items-center">
                                    <div className="level-item">
                                        <p className="is-size-6 is-break-word">
                                            {props.kommentar.editDatum !== null
                                                ? `Bearbeitet: ${datumKonvertieren(props.kommentar.editDatum)}`
                                                : `Verfasst: ${datumKonvertieren(props.kommentar.datum)}`}
                                        </p>
                                    </div>
                                    {props.aktuellerBenutzer !== null &&
                                        (props.aktuellerBenutzer.rolle.kannKommentareLöschen || props.aktuellerBenutzer.id === props.kommentar.nutzer.id) &&
                                        <div className="level-item">
                                            <KommentarMenue
                                                aktuellerBenutzer={props.aktuellerBenutzer}
                                                kommentar={props.kommentar}
                                                kommentare={props.kommentare}
                                                setKommentare={props.setKommentare}
                                                setWirdBearbeitet={setWirdBearbeitet}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="content"
                             style={{
                                 margin: "0",
                                 wordWrap: "break-word",
                                 overflowWrap: "break-word",
                                 textAlign: 'left',
                             }}>
                            {props.kommentar.inhalt}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Kommentar;