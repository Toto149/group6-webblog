import {useState} from "react";
import Kommentare from "./kommentare/Kommentare";
import BeitragBearbeitenFormular from "./BeitragBearbeitungsFormular";
import datumKonvertieren from "./DatumKonvertieren";
import PropTypes from "prop-types";


export default function Beitrag(props){


                //Diese Komponente soll einen einzelnen Beitrag des Web-blogs modellieren.
                //Die Idee ist, dass diese Komponente Kommentare des Beitrags anzeigt und auf
                // eine einzelne

                //Dieser useState überprüft, ob der Kommentare-editier-Button gedrückt wurde.
                const [wurdeEditGeklickt, setWurdeEditGeklickt ] = useState(false);


                //Dieser useStat überprüft, ob der Beitrag editiert wurde und wenn ja, dann soll das Datum angepasst
                // werden.
                const [wurdeSubmitet, setWurdeSubmitet] = useState(false);

                //Diese Funktion soll die Kategorien anzeigen.
                const displayKategorien = (kategorien) => {
                    let str = "Kategorien: ";
                    for(let i = 0; i<kategorien.length; i++){
                        if(i<kategorien.length-1) {
                            str += kategorien[i] + ", ";
                        } else {
                            str += kategorien[i];
                        }
                    }
                    return str;

                };

        

                //Diese Funktion lässt das Feld für die Bearbeitung erscheinen
                const handleEdit = () => {
                    setWurdeEditGeklickt(!wurdeEditGeklickt);
                }

    const nutzerDerBeitrag = props.benutzers.filter(b => b.name === props.beitrag.nutzer);



    const handleDelete = () => {

        props.setBeitraege(props.beitraege.filter(b => b.id !== props.beitrag.id));
    }
    return (

        <div key={props.key}
            className="column is-9"
        >
            <div className="card large">
                <div className="card-image" style={{backgroundColor: "white", borderTopLeftRadius: "15px",borderTopRightRadius: "15px"}}>
                    <figure className="image is-16by9" >
                        <img src={props.beitrag.bildUrl} style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
                    </figure>
                </div>
                <div className="card-content" style={{backgroundColor: "ghostwhite", color: "black", borderWidth: "0.25px", borderColor:"black", borderTop:"solid"}}>
                    <div className="media">
                    <div className="media-left">
                        <figure >
                            <img className="image is-48x48  has-radius-rounded" src={nutzerDerBeitrag[0].avatar} alt="profilbild" />
                        </figure>
                    </div>
                    <div className="media-content has-text-centered">
                        <p className="title is-6 is-italic no-padding" style={{textAlign: "left"}}>{nutzerDerBeitrag[0].name}</p>
                        <p className={"title is-3 no-padding"} style={{textAlign: "center"}}>
                            {props.beitrag.titel}
                        </p>
                        <br/>

                    </div>
                    </div>
                    <hr style={{color: "green", marginLeft: "2em", marginRight: "2em"}}/>
                    <div>
                        {displayKategorien(props.beitrag.kategorien)}
                    </div>
                    <br/>
                    <div>
                        <p
                            style={{
                                textAlign: "left",
                                marginRight: "2em",
                                marginLeft: "2em"
                            }}
                        >
                            {props.beitrag.inhalt}
                        </p>
                    </div>
                    <p
                        style={{
                            textAlign: "right",
                            fontSize: "0.75em"
                        }}
                    >
                        Erstellt am: &nbsp; {datumKonvertieren(props.beitrag.erstellungsDatum)}
                    </p>
                    {wurdeSubmitet &&
                        <p
                            style={{
                                textAlign: "right",
                                fontSize: "0.75em"
                            }}>
                           Zuletzt bearbeitet am: &nbsp; {datumKonvertieren(props.beitrag.publizierungsDatum)}
                        </p>
                    }
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        {props.aktuellerBenutzer?.rolle.kannBeitragLöschen &&
                            <button
                                onClick={handleDelete}
                                className="button is-dark mr-2"
                            ><i className="fa fa-trash" aria-hidden="true"></i> &nbsp; Löschen
                            </button>
                        }

                        {props.aktuellerBenutzer?.rolle.kannBeitragVerändern &&
                            <button
                                onClick={handleEdit}
                                className="button is-dark"
                            >
                                <i className="fa fa-edit"></i> &nbsp; Bearbeiten
                            </button>
                        }
                    </div>
                    <div>
                        {wurdeEditGeklickt && <BeitragBearbeitenFormular
                            beitrag={props.beitrag}
                            beitraege={props.beitraege}
                            setBeitraege={props.setBeitraege}
                            aktuellerBenutzer={props.aktuellerBenutzer}
                            setWurdeEditGeklickt={setWurdeEditGeklickt}
                            setWurdeSubmitet={setWurdeSubmitet}
                        />}


                        {<Kommentare beitrag={props.beitrag}
                                     beitraege={props.beitraege}
                                     setBeitraege={props.setBeitraege}
                                     kommentare={props.kommentare}
                                     setKommentare={props.setKommentare}
                                     aktuellerBenutzer={props.aktuellerBenutzer}
                        />
                        }


                    </div>
                </div>
            </div>
        </div>
    );

}
Beitrag.propTypes = {
    setBeitraege: PropTypes.func.isRequired,
    aktuellerBenutzer: PropTypes.object.isRequired,
    beitrag: PropTypes.object.isRequired,
    kommentare: PropTypes.array.isRequired,
    beitraege: PropTypes.array.isRequired,
    setKommentare: PropTypes.func.isRequired,
    key: PropTypes.any.isRequired
}