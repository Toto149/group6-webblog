import {useState} from "react";
import Kommentare from "./kommentare/Kommentare";
import BeitragBearbeitenFormular from "./BeitragBearbeitungsFormular";
import datumKonvertieren from "./DatumKonvertieren";


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


    const handleDelete = () => {

        props.setBeitraege(props.beitraege.filter(b => b.id !== props.beitrag.id));
    }
    return (
        // <div key={props.key}
        //      style={{
        //          textAlign: "center",
        //          backgroundColor: "darkcyan",
        //          borderRadius: "20px",
        //          marginLeft: "15px",
        //          marginRight: "30px",
        //          marginBottom: "10px",
        //          fontFamily: "sans-serif"
        //      }}>
        //     <div>
        //         <span
        //             style={{
        //                 fontSize: "2em",
        //                 fontWeight: "bold"
        //             }}>
        //             {props.beitrag.titel}
        //         </span>
        //         <br />
        //         {"by   " + props.beitrag.nutzer.name}
        //     </div>
        //     <hr style={{color: "green", marginLeft:"2em", marginRight: "2em"}}/>
        //     <div>
        //         {displayKategorien(props.beitrag.kategorien)}
        //     </div>
        //     <br />
        //     <div>
        //         <p
        //             style={{
        //                 textAlign: "left",
        //                 marginRight: "2em",
        //                 marginLeft: "2em"
        //             }}
        //         >
        //             {props.beitrag.inhalt}
        //         </p>
        //     </div>
        //     <p
        //         style={{
        //             textAlign: "right",
        //             marginRight: "2em"
        //     }}
        //     >
        //         {datumKonvertieren(props.beitrag.erstellungsDatum)}
        //     </p>
        //     {wurdeSubmitet &&
        //         <p
        //             style={{
        //                 textAlign: "right",
        //                 marginRight: "2em",
        //         }}>
        //             {datumKonvertieren(props.beitrag.publizierungsDatum)}
        //         </p>
        //     }
        //     <div
        //         style={{
        //             textAlign: "right",
        //             }}
        //     >
        //     {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannBeitragLöschen &&
        //         <button
        //             onClick={handleDelete}
        //             style={{
        //                 backgroundColor: "darkcyan",
        //                 borderRadius: "5px",
        //                 textAlign: "right",
        //             }}
        //         >Löschen <i class="fa fa-trash" aria-hidden="true"></i>
        //         </button>
        //     }
        //
        //     {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannBeitragVerändern &&
        //         <button
        //             onClick={handleEdit}
        //             style={{
        //                 backgroundColor: "darkcyan",
        //                 borderRadius: "5px",
        //                 marginLeft: "10px",
        //                 borderColor: "black",
        //                 textAlign: "right",
        //                 marginRight: "2em"
        //             }}
        //         >
        //             Bearbeiten {" "}<i class="fa fa-edit"></i>
        //         </button>
        //     }
        //     </div>
        //     <div>
        //         <h3>Kommentare</h3>
        //
        //
        //         {<Kommentare beitrag={props.beitrag}
        //                      beitraege={props.beitraege}
        //                      setBeitraege={props.setBeitraege}
        //                      kommentare={props.kommentare}
        //                      setKommentare={props.setKommentare}
        //                      aktuellerBenutzer={props.aktuellerBenutzer}
        //         />
        //         }
        //
        //
        //         {wurdeEditGeklickt && <BeitragBearbeitenFormular
        //             beitrag={props.beitrag}
        //             beitraege={props.beitraege}
        //             setBeitraege={props.setBeitraege}
        //             aktuellerBenutzer={props.aktuellerBenutzer}
        //             setWurdeSubmitet={setWurdeSubmitet}
        //         /> }
        //     </div>
        // </div>
        <div key={props.key}
            className="column is-9"
        >
            <div className="card large">
                <div className="card-content">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src="https://docs.moodle.org/404/de/images_de/7/7c/F1.png" alt="profilbild" />
                        </figure>
                    </div>
                    <div className="media-content has-text-centered">
                        <p className="title is-4 no-padding" style={{textAlign: "left"}}>{props.beitrag.nutzer.name}</p>
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
                            marginRight: "2em"
                        }}
                    >
                        {datumKonvertieren(props.beitrag.erstellungsDatum)}
                    </p>
                    {wurdeSubmitet &&
                        <p
                            style={{
                                textAlign: "right",
                                marginRight: "2em",
                            }}>
                            {datumKonvertieren(props.beitrag.publizierungsDatum)}
                        </p>
                    }
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannBeitragLöschen &&
                            <button
                                onClick={handleDelete}
                                className="button is-info mr-2"
                            >Löschen <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        }

                        {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannBeitragVerändern &&
                            <button
                                onClick={handleEdit}
                                className="button is-info"
                            >
                                Bearbeiten {" "}<i className="fa fa-edit"></i>
                            </button>
                        }
                    </div>
                    <div>
                        <h3>Kommentare</h3>


                        {<Kommentare beitrag={props.beitrag}
                                     beitraege={props.beitraege}
                                     setBeitraege={props.setBeitraege}
                                     kommentare={props.kommentare}
                                     setKommentare={props.setKommentare}
                                     aktuellerBenutzer={props.aktuellerBenutzer}
                        />
                        }


                        {wurdeEditGeklickt && <BeitragBearbeitenFormular
                            beitrag={props.beitrag}
                            beitraege={props.beitraege}
                            setBeitraege={props.setBeitraege}
                            aktuellerBenutzer={props.aktuellerBenutzer}
                            setWurdeSubmitet={setWurdeSubmitet}
                        />}
                    </div>
                </div>
            </div>
        </div>
    );

}