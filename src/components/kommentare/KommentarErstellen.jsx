import React, {useEffect, useRef, useState} from 'react';
import generiereZufaelligeID from "./GeneriereID";

const KommentarErstellen = (props) => {
    const maxZeichen = 250;
    const warnungSchwellenFaktor = 0.1;

    const [inhalt, setInhalt] = useState(props.kommentar != null ? props.kommentar.inhalt : '');
    const eingabeRef = useRef(null);

    const verarbeiteInhaltsAenderung = (event) => {
        setInhalt(event.target.value);
    };

    const verarbeiteKnopfdruck = () => {
        if (inhalt.length <= maxZeichen && inhalt.length>0) {
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
        }
    };

    const speichern = () => {
        if (inhalt.length <= maxZeichen && inhalt.length>0) {
            const tempKommentar = {
                "id": props.kommentar.id,
                "nutzer": props.aktuellerBenutzer,
                "inhalt": inhalt,
                "datum": props.kommentar.datum,
                "editDatum": Date.now(),
                "beitragsId": props.kommentar.beitragsId,
            }
            const gefiltert = props.kommentare.filter((kom) => kom.id !== props.kommentar.id);
            props.setKommentare([...gefiltert, tempKommentar]);
            props.setWirdBearbeitet(false);
        }
    }

    const abbrechen = () => {
        props.setWirdBearbeitet(false);
    }

    useEffect(() => {
        if (props.wirdBearbeitet && eingabeRef.current) {
            eingabeRef.current.focus();
        }
    }, [props.wirdBearbeitet]);

    const farbeZeichenUebrig = () => {
        const zeichenUebrig = maxZeichen - inhalt.length;
        if (zeichenUebrig < 0) {
            return 'has-text-danger';

        } else if (zeichenUebrig < maxZeichen * warnungSchwellenFaktor) {
            return 'has-text-warning';
        } else {
            return 'has-text-white';
        }
    }


    return (
        <>


            <div className="card">
                <div className="card-content">
                    {props.aktuellerBenutzer !== null
                        ? <>

                            <div className="field">
                                <div className="control">
                                    <input
                                        ref={eingabeRef}
                                        className="input"
                                        type="text"
                                        placeholder="Teile auch deine Meinung / Gib auch deinen Senf hinzu..."
                                        value={inhalt}
                                        onChange={verarbeiteInhaltsAenderung}
                                    />
                                </div>
                            </div>
                            <div className="level is-mobile">
                                <div className="level-left">
                                    <p className={`is-size-7 ${farbeZeichenUebrig()}`}>{`Zeichen übrig: ${maxZeichen - inhalt.length}`}</p>
                                </div>
                                <div className="level-right">
                                    {props.wirdBearbeitet
                                        ? <>
                                            <button className="button is-small" onClick={speichern}>Änderung speichern
                                            </button>
                                            <button className="button is-small is-light" onClick={abbrechen}>Abbrechen
                                            </button>
                                        </>
                                        : <button className="button" onClick={verarbeiteKnopfdruck}>Kommentar
                                            hinzufügen</button>}
                                </div>
                            </div>
                        </>
                        : <p>Log dich ein, um auch Kommentare verfassen zu können!</p>}
                </div>
            </div>


            <div style={{
                borderStyle: "solid", padding: "10px", margin: "20px", display: "flex",
                flexDirection: "column",
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                backgroundColor: "lightblue",
                borderRadius: "10px",
            }}>
                {props.aktuellerBenutzer !== null
                    ? <>
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
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                            height: '30px',
                            alignItems: 'center'
                        }}>
                            <p style={{
                                fontSize: '14px',
                                color: `${farbeZeichenUebrig()}`
                            }}>{`Zeichen übrig: ${maxZeichen - inhalt.length}`}</p>
                            {props.wirdBearbeitet
                                ? <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button onClick={speichern}>Änderung speichern</button>
                                    <button style={{marginLeft: '10px'}} onClick={abbrechen}>Abbrechen</button>
                                </div>
                                : <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button onClick={verarbeiteKnopfdruck}>Kommentar hinzufügen</button>
                                </div>}
                        </div>
                    </>
                    : <p>Log dich ein um auch Kommentare verfassen zu können!</p>}
            </div>

        </>
    );
};

export default KommentarErstellen;