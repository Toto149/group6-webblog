import React, {useState} from 'react';
import {benutzer, registrierterBenutzer} from "../../Benutzer";

const BenutzerErstellen = (props) => {

    const tempRolle = {
        name: "registrierterBenutzer",
        kannKommentieren: true,
        kannKommentareLöschen: false,
        kannBeitragLöschen: false,
        kannBeitragVerfassen: false,
        kannBeitragVerändern: false,
        kannRolleÄndern: false,
    };

    const tempBenutzer = {
        name: "user" + Date.now(),
        passwort: "",
        avatar: "https://th.bing.com/th/id/OIG4..GlNkMAXarsBMDOfy9dT?w=1024&h=1024&rs=1&pid=ImgDetMain",
        rolleName: "registrierterBenutzer",
        rolle: tempRolle
    };


    const [neuerBenutzer, setNeuerBenutzer] = useState(tempBenutzer);

    const [fehlerMeldung, setFehlerMeldung] = useState('');

    const nameAendern = (e) => {
        setNeuerBenutzer({ ...neuerBenutzer, name: e.target.value });
    };

    const passwortAendern = (e) => {
        setNeuerBenutzer({ ...neuerBenutzer, passwort: e.target.value });
    };

    const avatarAendern = (e) => {
        setNeuerBenutzer({ ...neuerBenutzer, avatar: e.target.value });
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

        setNeuerBenutzer({ ...neuerBenutzer, rolleNane: "registrierterBenutzer" });
        props.setBenutzers([...props.benutzers, neuerBenutzer]);
        setFehlerMeldung('');
        props.setAnzeigeForm(true);
    };

    function zurAnmeldungsform() {
        props.setAnzeigeForm(true);
    }

    return (
        <div>
            <form className="p-5 has-text-right" onSubmit={registrieren}>

                <input
                    className="input"
                    style={{width: '200px'}}
                    type="text"
                    value={neuerBenutzer.name}
                    placeholder="Benutzername"
                    onChange={nameAendern}
                    required
                />
                <span> </span>

                <input
                    className="input"
                    style={{width: '200px'}}
                    type="password"
                    value={neuerBenutzer.passwort}
                    placeholder="Passwort"
                    onChange={passwortAendern}
                    required
                />
                <span> </span>

                <input
                    className="input"
                    style={{width: '200px'}}
                    type="text"
                    value={neuerBenutzer.avatar}
                    placeholder="URL für Avatar"
                    onChange={avatarAendern}
                    required
                />
                <span> </span>


                <button className="button is-white is-outlined" type="submit">
                                <span className="icon">
                                    <i className="fa fa-edit"></i>
                                </span>
                    <span>  </span>
                    Registrieren
                </button>
                <span> </span>

                <a className="button is-info is-outlined" href="#" href="#"
                   onClick={zurAnmeldungsform}>
                                            <span className="icon">
                                                <i className="fa fa-cog"></i>
                                            </span>
                    <span>zur Anmeldungsform</span>
                </a>

            </form>
            {fehlerMeldung && <p className="subtitle is-6 is-color-warning has-text-right">{fehlerMeldung}</p>}

        </div>
    );

};

export default BenutzerErstellen;

