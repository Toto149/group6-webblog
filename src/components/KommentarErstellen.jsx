import React, {useState} from 'react';
import {beitrag} from "../Beitrag";
import {administrator} from "../Benutzer";

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

    const [inhalt, setInhalt] = useState('');

    const verarbeiteInhaltsAenderung = (event) => {
        setInhalt(event.target.value);
    };

    const verarbeiteKnopfdruck = () => {
        beitrag.kommentare.push = {
            "id": "234235", //generate new
            "nutzer": administrator, //getfrom login session?
            "inhalt": {inhalt},
            "datum" : new Date(),
            "editDatum" : {},
            "beitragsId" : {props},
        };

        setInhalt('')
    };

    return (
        <>
            <div style={{
                borderStyle: "solid", padding: "10px", margin: "20px", display: "flex",
                flexDirection: "column",
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            }}>
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
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '10px' }}>
                    <button onClick={verarbeiteKnopfdruck}>Kommentar hinzufügen</button>
                </div>
            </div>
        </>
    );
};

export default KommentarErstellen;