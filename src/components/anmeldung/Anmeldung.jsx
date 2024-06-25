import React, { useState } from 'react';
import BenutzerErstellen from "./BenutzerErstellen";

const Anmeldung = (props) => {
    const [benutzername, setBenutzername] = useState('');
    const [passwort, setPasswort] = useState('');

    const [anzeigeForm, setAnzeigeForm] = useState(true);
    const [fehlerMeldung, setFehlerMeldung] = useState('');

    const anmelden = (e) => {
        e.preventDefault();

        const gefundenBenutzer = props.benutzers.find(b => b.name === benutzername);

        if (!gefundenBenutzer) {
            setFehlerMeldung('Benutzername nicht gefunden. Möchten Sie sich registrieren?');
            return;
        }

        if (gefundenBenutzer.passwort !== passwort) {
            setFehlerMeldung('Falsches Passwort.');
            return;
        }

        props.setAktuellerBenutzer(gefundenBenutzer);
        setAnzeigeForm(false);
        setFehlerMeldung('');
        setBenutzername('');
        setPasswort('');
    };

    const abmelden = () => {
        props.setAktuellerBenutzer(null);
        setAnzeigeForm(true);
    };

    const zurRegistrierungsform = () => {
        setAnzeigeForm(false);
    };

    if (!props.aktuellerBenutzer) {
        return (
            <div>
                {anzeigeForm ? (
                    <form onSubmit={anmelden}>
                        <input
                            type="text"
                            value={benutzername}
                            placeholder="Benutzername"
                            onChange={(e) => setBenutzername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={passwort}
                            placeholder="Passwort"
                            onChange={(e) => setPasswort(e.target.value)}
                            required
                        />
                        <button type="submit">Anmelden</button>
                        <span> </span>
                        <a href="#" onClick={zurRegistrierungsform}>zur Registrierungsform</a>
                        {fehlerMeldung && <p>{fehlerMeldung}</p>}
                    </form>
                ) : <BenutzerErstellen benutzers={props.benutzers}
                                       setBenutzers={props.setBenutzers}
                                       anzeigeForm={anzeigeForm}
                                       setAnzeigeForm={setAnzeigeForm}
                />}
                <hr/>
            </div>
        );
    } else {
        return (
            <div>
                <label>Herzlich willkommen, {props.aktuellerBenutzer.name}!</label>
                <button onClick={abmelden}>Abmelden</button>

                <hr />
            </div>
        );
    }
};

export default Anmeldung;



