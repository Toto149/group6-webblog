import React, {useEffect, useRef, useState} from 'react';
import generiereZufaelligeID from "./GeneriereID";
import styled from 'styled-components';

const Input = styled.input`
    background-color: #ffffff;
    color: hsl(0, 0%, 4%);
    &::placeholder {
        color: hsla(0, 0%, 4%, 0.6);
    }
`;

const KommentarErstellen = (props) => {
    const maxZeichen = 250;
    const warnungSchwellenFaktor = 0.2;

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
            <div className="card" style={{backgroundColor: '#2e333d'}}>
                <div className="card-content">
                    {props.aktuellerBenutzer !== null
                        ? <>

                            <div className="field">
                                <div className="control" >
                                    <Input
                                        ref={eingabeRef}
                                        className="input"
                                        type="text"
                                        placeholder="Teile auch deine Meinung ..."
                                        value={inhalt}
                                        onChange={verarbeiteInhaltsAenderung}
                                    />
                                </div>
                            </div>
                            <div className="level is-mobile">
                                <div className="level-left">
                                    <p className={`is-size-6 ${farbeZeichenUebrig()}`}>{`Zeichen übrig: ${maxZeichen - inhalt.length}`}</p>
                                </div>
                                <div className="level-right">
                                    {props.wirdBearbeitet
                                        ? <>
                                            <button className="button is-small is-info" onClick={speichern}>Änderung speichern
                                            </button>
                                            <button className="button is-small is-light" onClick={abbrechen}>Abbrechen
                                            </button>
                                        </>
                                        : <button className="button is-info" onClick={verarbeiteKnopfdruck}>Kommentar
                                            hinzufügen</button>}
                                </div>
                            </div>
                        </>
                        : <p>Log dich ein, um auch Kommentare verfassen zu können!</p>}
                </div>
            </div>
    );
};

export default KommentarErstellen;