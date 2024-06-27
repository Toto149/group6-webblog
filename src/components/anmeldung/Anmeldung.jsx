import React, { useState } from 'react';
import BenutzerErstellen from "./BenutzerErstellen";
import BenutzerVerwaltung from "./BenutzerVerwaltung";

const Anmeldung = (props) => {
    const [benutzername, setBenutzername] = useState('');
    const [passwort, setPasswort] = useState('');

    const [anzeigeForm, setAnzeigeForm] = useState(true);
    const [fehlerMeldung, setFehlerMeldung] = useState('');

    const [zeigenVerwaltung, setZeigenVerwaltung] = useState(false);

    const anmelden = (e) => {
        e.preventDefault();

        const gefundenBenutzer = props.benutzers.find(b => b.name === benutzername);

        if (!gefundenBenutzer) {
            setFehlerMeldung('Benutzername nicht gefunden. Möchten Sie sich registrieren?');

            <BenutzerErstellen benutzers={props.benutzers} setBenutzers={props.setBenutzers} />

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

    function zurBenutzerVerwaltung() {
        setZeigenVerwaltung(!zeigenVerwaltung);
    }

    if (!props.aktuellerBenutzer) {
        return (
            <div>
                {anzeigeForm ? (
                    <>
                        <form className="p-5 has-text-right" onSubmit={anmelden}>

                            <input
                                className="input"
                                style={{width: '200px'}}
                                type="text"
                                value={benutzername}
                                placeholder="Benutzername"
                                onChange={(e) => setBenutzername(e.target.value)}
                                required
                            />
                            <span> </span>

                            <input
                                className="input"
                                style={{width: '200px'}}
                                type="password"
                                value={passwort}
                                placeholder="Passwort"
                                onChange={(e) => setPasswort(e.target.value)}
                                required
                            />

                            <span> </span>

                            <button className="button is-white is-outlined" type="submit">
                                            <span className="icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                <span>  </span>
                                Anmelden
                            </button>

                            <span> </span>

                            <a className="button is-info is-outlined" href="#"
                               onClick={zurRegistrierungsform}>
                                            <span className="icon">
                                                <i className="fa fa-cog"></i>
                                            </span>
                                <span>zur Registrierungsform</span>
                            </a>


                            {fehlerMeldung && <p className="subtitle is-6 is-color-warning">{fehlerMeldung}</p>}
                        </form>
                    </>
                ) : (
                    <>
                        <BenutzerErstellen benutzers={props.benutzers}
                                           setBenutzers={props.setBenutzers}
                                           anzeigeForm={anzeigeForm}
                                           setAnzeigeForm={setAnzeigeForm}

                        />
                    </>)}

            </div>
        );
    } else {
        return (
            <div className="p-5 has-text-right">
                <label className="button pt-9 is-6 is-color-info">Herzlich
                    willkommen, {props.aktuellerBenutzer.name}!</label>
                <span> </span>

                <a className="button is-white is-outlined" href="#" onClick={abmelden}>
                                    <span className="icon">
                                        <i className="fa fa-user"></i>
                                    </span>
                    <span>Abmelden</span>
                </a>


                <span> </span>

                {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannRolleÄndern && !zeigenVerwaltung && (

                    <a className="button is-info is-outlined"  href="#" onClick={zurBenutzerVerwaltung}>
                                    <span className="icon">
                                        <i className="fa fa-cog"></i>
                                    </span>
                        <span>zur Benutzerverwaltung</span>
                    </a>

                )
                }

                {
                    props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannRolleÄndern && zeigenVerwaltung && (

                        <a className="button is-info is-outlined"  href="#" onClick={zurBenutzerVerwaltung}>
                                    <span className="icon">
                                        <i className="fa fa-cog"></i>
                                    </span>
                            <span>Benutzerverwaltung schließen</span>
                        </a>
                    )
                }

                {
                    zeigenVerwaltung && (
                        <>

                            <BenutzerVerwaltung benutzers={props.benutzers}
                                                setBenutzers={props.setBenutzers}
                                                aktuellerBenutzer={props.aktuellerBenutzer}
                            />
                        </>
                    )}

            </div>
        );
    }
};

export default Anmeldung;



