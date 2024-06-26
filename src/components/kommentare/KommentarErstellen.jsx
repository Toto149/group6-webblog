import React, {useEffect, useRef, useState} from 'react';
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
    const [inhalt, setInhalt] = useState(props.kommentar!=null ? props.kommentar.inhalt:'');
    const eingabeRef = useRef(null);

    const verarbeiteInhaltsAenderung = (event) => {
        setInhalt(event.target.value);
    };

    const verarbeiteKnopfdruck = () => {
        const beitragsId = props.beitrag.id;
        const tempKommentar = {
            "id": generiereZufaelligeID(),
            "nutzer": props.aktuellerBenutzer,
            "inhalt": inhalt,
            "datum": Date.now(),
            "editDatum": null,
            "beitragsId": beitragsId,
        }
        props.setKommentare([...props.kommentare, tempKommentar]);
        setInhalt('')
    };

    const speichern = ()=>{
        const tempKommentar = {
            "id": props.kommentar.id,
            "nutzer": props.aktuellerBenutzer,
            "inhalt": inhalt,
            "datum": props.kommentar.datum,
            "editDatum": Date.now(),
            "beitragsId": props.kommentar.beitragsId,
        }
        const gefiltert = props.kommentare.filter((kom)=> kom.id!==props.kommentar.id);
        props.setKommentare([...gefiltert,tempKommentar]);
        props.setWirdBearbeitet(false);
    }

    const abbrechen = () =>{
        props.setWirdBearbeitet(false);
    }

    useEffect(() => {
        if (props.wirdBearbeitet && eingabeRef.current){
            eingabeRef.current.focus();
        }
    }, [props.wirdBearbeitet]);

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
                        ref={eingabeRef}
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
                    {props.wirdBearbeitet ? <>
                            <div style={{display: "flex", justifyContent: "flex-end", marginTop: '10px'}}>
                                <button onClick={speichern}>Änderung speichern </button>
                                <button style={{marginLeft: '10px'}} onClick={abbrechen}>Abbrechen</button>
                            </div>
                        </> :
                        <div style={{display: "flex", justifyContent: "flex-end", marginTop: '10px'}}>
                            <button onClick={verarbeiteKnopfdruck}>Kommentar hinzufügen</button>
                        </div>}
                </>
                : <p>Log dich ein um auch Kommentare verfassen zu können!</p>}
        </div>
    );
};

export default KommentarErstellen;