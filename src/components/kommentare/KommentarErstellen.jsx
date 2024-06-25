import React, {useState} from 'react';
import {administrator} from "../../Benutzer";
import generiereZufaelligeID from "./GeneriereID";

const KommentarErstellen = (props) => {
    //nur wenn eingeloggt.

    //nimmt nutzer
    //eingabefeld
    // - nimmt text und datum
    //erstellt ID
    //button zum abschicken (oder testen ob lang genug)

    //adden zum Kommentare Array im Beitrag
    //kommentar array sollte aktualisiert werden und rerender triggern
    //form wieder leer
    const beitragsId = props.beitrag.id;

    const [inhalt, setInhalt] = useState('');

    const verarbeiteInhaltsAenderung = (event) => {
        setInhalt(event.target.value);
    };

    const verarbeiteKnopfdruck = () => {
        const tempKommentar = {
            "id": generiereZufaelligeID(),
            "nutzer": props.aktuellerBenutzer,
            "inhalt": inhalt,
            "datum": new Date(),
            "editDatum": {},
            "beitragsId": beitragsId,
        }
        props.setKommentare([...props.kommentare, tempKommentar]);

        setInhalt('')
    };

    return (
        <div style={{
            borderStyle: "solid", padding: "10px", margin: "20px", display: "flex",
            flexDirection: "column",
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            backgroundColor: "lightblue",
            borderRadius: "10px"
        }}>
            {props.aktuellerBenutzer !== null ?
                <>
                    <input
                        placeholder="Teile auch deine Meinung / Gib auch deinen Senf hinzu..."
                        style={{
                            width: '100%',
                            height: '50px',
                            padding: '0 10px',
                            boxSizing: 'border-box'
                        }}
                        value={inhalt}
                        onChange={verarbeiteInhaltsAenderung}
                    />
                    <div style={{display: "flex", justifyContent: "flex-end", marginTop: '10px'}}>
                        <button onClick={verarbeiteKnopfdruck}>Kommentar hinzufügen</button>
                    </div>
                </>
                : <p>Log dich ein um auch Kommentare verfassen zu können!</p>}
        </div>
    );
};

export default KommentarErstellen;