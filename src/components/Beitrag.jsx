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
                    console.log(kategorien)
                    return kategorien.map(kategorie => "Kategorien: " + kategorie
                        + (kategorie.indexOf(kategorie) !== kategorie.length - 1  ? ", "  :  "")
                    );

                };

        

                //Diese Funktion lässt das Feld für die Bearbeitung erscheinen
                const handleEdit = () => {
                    setWurdeEditGeklickt(!wurdeEditGeklickt);
                }


    const handleDelete = () => {

        props.setBeitraege(props.beitraege.filter(b => b.id !== props.beitrag.id));
    }
    return (
        <div key={props.key}
             style={{
                 textAlign: "center",
                 backgroundColor: "darkcyan",
                 borderRadius: "20px",
                 marginLeft: "15px",
                 marginRight: "30px",
                 marginBottom: "10px",
                 fontFamily: "sans-serif"
             }}>
            <div>
                <span
                    style={{
                        fontSize: "2em",
                        fontWeight: "bold"
                    }}>
                    {props.beitrag.titel}
                </span>
                <br />
                {"by   " + props.beitrag.nutzer.name}
            </div>
            <hr style={{color: "green", marginLeft:"2em", marginRight: "2em"}}/>
            <div>
                {displayKategorien(props.beitrag.kategorien)}
            </div>
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

            {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannBeitragLöschen &&
                <button
                    onClick={handleDelete}
                    style={{
                        backgroundColor: "darkcyan",
                        borderRadius: "5px"
                    }}
                >Löschen 🗑</button>
            }

            {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannBeitragVerändern &&
                <button
                    onClick={handleEdit}
                    style={{
                        backgroundColor: "darkcyan",
                        borderRadius: "5px"
                    }}
                >
                    Bearbeiten ✏ ️
                </button>
            }
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
                /> }
            </div>
        </div>
    );

}