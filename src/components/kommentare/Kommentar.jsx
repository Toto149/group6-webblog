import React, {useState} from 'react';
import KommentarMenue from "./KommentarMenue";
import KommentarErstellen from "./KommentarErstellen";
import datumKonvertieren from "../DatumKonvertieren";
import PropTypes from 'prop-types';

const Kommentar = (props) => {

    const [wirdBearbeitet, setWirdBearbeitet] = useState(false);


    //Deine Benutzernamen werden mal so props.kommentar.nutzer.name und mal so props.kommentar.nutzer übergeben.
    //Ich kann nicht finden, wo das passiert. Deshalb habe ich diesen seltsamen Code geschrieben.

    //Und möglicherweise gibt es deshalb noch einen Fehler: Benutzer können die Kommentare anderer Benutzer bearbeiten.
    //mit Löschen das gleich

    let avatarUrl=null;

    let nutzerDerKommentar = props.benutzers.filter(b => b.name === props.kommentar.nutzer.name);

    if (nutzerDerKommentar && nutzerDerKommentar.length > 0) {
        avatarUrl = (nutzerDerKommentar && nutzerDerKommentar.length > 0) ? nutzerDerKommentar[0].avatar : "";
    } else {
        nutzerDerKommentar = props.benutzers.filter(b => b.name === props.kommentar.nutzer);
        avatarUrl = (nutzerDerKommentar && nutzerDerKommentar.length > 0) ? nutzerDerKommentar[0].avatar : "";
    }

    // ende


    return (
        <>


            {wirdBearbeitet ? (
                <KommentarErstellen kommentare={props.kommentare}
                                    setKommentare={props.setKommentare}
                                    aktuellerBenutzer={props.aktuellerBenutzer}
                                    wirdBearbeitet={wirdBearbeitet}
                                    setWirdBearbeitet={setWirdBearbeitet}
                                    benutzers={props.benutzers}
                                    kommentar={props.kommentar}/>
                ) : (

                <div className="card large mb-3 " style={{minHeight: '150px', backgroundColor: '#2e333d'}}>
                    <div className="card-content">
                        <div className="media is-justify-content-space-between is-align-items-center ">
                            <div className="media-left is-flex is-align-items-center ">
                                <figure className="image is-48x48 mr-2">
                                    <img className="has-radius-rounded" src={avatarUrl} alt="Profilbild"/>
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
                                                benutzers={props.benutzers}
                                                kommentar={props.kommentar}
                                                kommentare={props.kommentare}
                                                setKommentare={props.setKommentare}
                                                setWirdBearbeitet={setWirdBearbeitet}
                                                kommentarIdFürLöschen={props.kommentarIdFürLöschen}
                                                setKommentarIdFürLöschen={props.setKommentarIdFürLöschen}
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
            )
            }
        </>
    );
};

Kommentar.propTypes = {
    kommentar: PropTypes.object.isRequired,
    kommentare: PropTypes.array.isRequired,
    setKommentare: PropTypes.func.isRequired,
    benutzers: PropTypes.array.isRequired,
    aktuellerBenutzer: PropTypes.object,
};

export default Kommentar;