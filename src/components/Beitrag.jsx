import {useState} from "react";
import Kommentare from "./kommentare/Kommentare";
import BeitragBearbeitenFormular from "./BeitragBearbeitungsFormular";
import datumKonvertieren from "./DatumKonvertieren";


export default function Beitrag(props){


                //Diese Komponente soll einen einzelnen Beitrag des Web-blogs modellieren.
                //Die Idee ist, dass diese Komponente Kommentare des Beitrags anzeigt und auf
                // eine einzelne

                // Dieser useState überprüft, ob "Mehr Kommentare" anzeigen gedrückt wurde.
                const [wurdeGeklickt, setWurdeGeklickt ] = useState(false);

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

                //Diese Funktion ändert den boolean im useState oben.
                const hantiereKlick = () => {
                    setWurdeGeklickt(!wurdeGeklickt);
                };

        

                //Diese Funktion lässt das Feld für die Bearbeitung erscheinen
                const handleEdit = () => {
                    setWurdeEditGeklickt(!wurdeEditGeklickt);
                }
                
     const displayKategorien = (kategorien) => {
        return kategorien.map(kategorie => "Kategorien: " + kategorie + (kategorien.indexOf(kategorie) !== kategorien.length - 1 ? ", " : ""));

    }

    const handleDelete = () => {

        props.setBeitraege(props.beitraege.filter(b => b.id != props.beitrag.id));
    }
    return (
        <div key={props.key}
             style={{
                 textAlign: "center",
                 backgroundColor: "darkcyan",
                 borderRadius: "5px",
                 marginLeft: "15px",
                 marginRight: "30px",
                 marginBottom: "10px"
             }}>
            <div>
                <h3>{props.beitrag.titel}</h3>
                {"by   " + props.beitrag.nutzer.name}
            </div>
            <div>
                {displayKategorien(props.beitrag.kategorien)}
            </div>
            <div>
                <p>{props.beitrag.inhalt}</p>
            </div>
            <p style={{textAlign: "right"}}>{datumKonvertieren(props.beitrag.erstellungsDatum)}</p>
            <p style={{textAlign: "right", fontSize: "0.5em"}}>

            </p>
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
                {props.beitrag.nutzer && <button onClick={handleDelete} key={props.beitrag.id}>🗑️</button>}
            </div>
        </div>
    );

}