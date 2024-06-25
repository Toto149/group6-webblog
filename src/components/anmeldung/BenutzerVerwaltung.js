
import React, { useState, useEffect } from 'react';
import { registrierterBenutzer, moderator, admin } from '../../Benutzer';

const BenutzerVerwaltung = (props) => {
    const [suche, setSuche] = useState('');
    const [gefundeneBenutzer, setGefundeneBenutzer] = useState([]);
    const [gewaehlteRolle, setGewaelteRolle] = useState({});

    useEffect(() => {
        setGefundeneBenutzer(props.benutzers);
    }, [props.benutzers]);

    const suchen = (e) => {
        const suchWert = e.target.value;
        setSuche(suchWert);

        if (suchWert) {
            const gefilterteBenutzer = props.benutzers.filter(benutzer =>
                benutzer.name.toLowerCase().includes(suchWert.toLowerCase())
            );
            setGefundeneBenutzer(gefilterteBenutzer);
        } else {
            setGefundeneBenutzer(props.benutzers);
        }
    };

    const rolleGeaendert = (e, b) => {
        const neueRolle = e.target.value;
        setGewaelteRolle({ ...gewaehlteRolle, [b.id]: neueRolle });
    };

    const rolleSpeichern = (b) => {
        const neueRolle = gewaehlteRolle[b.id];

        const aktualisierteBenutzer = props.benutzers.map(bs =>
            bs.id === b.id ? { ...bs, rolle: JSON.parse(neueRolle) } : bs
        );

        props.setBenutzers(aktualisierteBenutzer);
        setGewaelteRolle({ ...gewaehlteRolle, [b.id]: neueRolle });
    };

    function aenderungenAbbrechen(b) {
        const { [b.id]: deletedItem, ...rest } = gewaehlteRolle;
        setGewaelteRolle(rest);
    }

    return (
        <>
            {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannRolleÄndern && (

                <div>
                    <input
                        type="text"
                        value={suche}
                        placeholder="Benutzer suchen"
                        onChange={suchen}
                    />
                    <label>Es wurden {gefundeneBenutzer ? gefundeneBenutzer.length : 0} Benutzer gefunden.</label>

                    <table>
                        <thead>
                        <tr>
                            <th>Name des Benutzers</th>
                            <th>Passwort</th>
                            <th>Rolle</th>
                            <th>Änderungen bestätigen</th>
                        </tr>
                        </thead>
                        <tbody>




                            {gefundeneBenutzer && gefundeneBenutzer.map(b => (
                                <tr key={b.id}>
                                    <td>{b.name}</td>
                                    <td>{b.passwort}</td>
                                    <td>{props.aktuellerBenutzer.rolle && props.aktuellerBenutzer.rolle.kannRolleÄndern && (
                                        <select
                                            value={gewaehlteRolle[b.id] || JSON.stringify(b.rolle)}
                                            onChange={(e) => rolleGeaendert(e, b)}
                                        >
                                            <option value={JSON.stringify(admin)}>admin</option>
                                            <option value={JSON.stringify(registrierterBenutzer)}>registrierter
                                                    Benutzer</option>
                                            <option value={JSON.stringify(moderator)}>moderator</option>
                                        </select>

                                    )}</td>
                                    <td>{gewaehlteRolle[b.id] && gewaehlteRolle[b.id] !== JSON.stringify(b.rolle) && (
                                        <>
                                        <button onClick={() => rolleSpeichern(b)}>✔️</button>
                                        <button onClick={() => aenderungenAbbrechen(b)}>❌</button>
                                        </>
                                    )}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>

            )}
        </>
    );
};

export default BenutzerVerwaltung;

