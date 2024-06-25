import React, {useState} from 'react';
import {benutzer} from "../../Benutzer";

const BenutzerErstellen = (props) => {

    const [neuerBenutzer, setNeuerBenutzer] = useState(benutzer);

    const [fehlerMeldung, setFehlerMeldung] = useState('');

    const nameAendern = (e) => {
        setNeuerBenutzer({ ...neuerBenutzer, name: e.target.value });
    };

    const passwortAendern = (e) => {
        setNeuerBenutzer({ ...neuerBenutzer, passwort: e.target.value });
    };

    const registrieren = (e) => {
        e.preventDefault();

        if (!neuerBenutzer.name || !neuerBenutzer.passwort) {
            setFehlerMeldung('Benutzername und Passwort dürfen nicht leer sein.');
            return;
        }

        const regulaereAusdruecke = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!regulaereAusdruecke.test(neuerBenutzer.passwort)) {
            setFehlerMeldung('Das Passwort muss mindestens 8 Zeichen lang sein und mindestens eine Ziffer, einen Großbuchstaben und ein Sonderzeichen enthalten.');
            return;
        }

        if (props.benutzers.some(benutzer => benutzer.name === neuerBenutzer.name)) {
            setFehlerMeldung('Benutzername bereits vorhanden.');
            return;
        }
        setNeuerBenutzer({ ...neuerBenutzer, id: Date.now() });
        props.setBenutzers([...props.benutzers, neuerBenutzer]);
        setFehlerMeldung('');
        props.setAnzeigeForm(true);
    };

    function zurAnmeldungsform() {
        props.setAnzeigeForm(true);
    }

    return (
        <div>
            <form onSubmit={registrieren}>
                <input
                    type="text"
                    value={neuerBenutzer.name}
                    placeholder="Benutzername"
                    onChange={nameAendern}
                />
                <input
                    type="password"
                    value={neuerBenutzer.passwort}
                    placeholder="Passwort"
                    onChange={passwortAendern}
                />
                <button type="submit">Registrieren</button>
                <a href="#" onClick={zurAnmeldungsform}>zur Anmeldungsform</a>
            </form>
            {fehlerMeldung && <p>{fehlerMeldung}</p>}
            <hr/>
        </div>
    );

};

export default BenutzerErstellen;

